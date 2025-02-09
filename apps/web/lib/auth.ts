import { supabase } from '@repo/db/supabase';
import jwt from 'jsonwebtoken';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

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
  },
  providers: [
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
