import { supabase } from '@repo/db/supabase';
import jwt from 'jsonwebtoken';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Credentials } from '@/types/next-auth';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error('client id missing');
  }
  if (!clientSecret || clientSecret.length == 0) {
    throw new Error('client secret missing');
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
    signOut: '/dashboard',
    error: "/"
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'john@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) {
          throw new Error('Provide Credentials');
        }
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error('Provide Login Credentials');
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const { data } = await supabase
          .from('User')
          .select('*')
          .eq('email', email)
          .single();

        if (data) {
          const passwordValidation = await bcrypt.compare(
            password,
            data.password
          );
          if (!passwordValidation) {
            throw new Error('Incorrect Password');
          }
          return {
            id: data.id.toString(),
            name: data.name,
            email: data.email,
          };
        }

        const id = uuidv4();
        const name = email.split('@')[0];
        const { data: createdUser } = await supabase
          .from('User')
          .insert([
            {
              id,
              name,
              email,
              password: hashedPassword,
            },
          ])
          .select();
        if (createdUser) {
          return {
            id: createdUser[0].id.toString(),
            name: createdUser[0].name,
            email: createdUser[0].email,
          };
        }
        throw new Error('Cannot able to create user');
      },
    }),
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
    encode: async ({ token, secret }) => {
      return jwt.sign(token!, secret, { algorithm: 'HS256' });
    },
    decode: async ({ token, secret }) => {
      return jwt.verify(token!, secret) as Promise<JWT | null>;
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user && user.email && user.name) {
        const { error } = await supabase.from('User').upsert(
          [
            {
              email: user.email,
              id: user.id,
              name: user.name,
              imageUrl: user.image || '',
            },
          ],
          { onConflict: 'email' }
        );

        if (error) {
          console.error('Error upserting user:', error);
          throw error;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
};
