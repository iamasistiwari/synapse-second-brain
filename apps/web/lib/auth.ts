import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@repo/db/client';

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  console.log('Loaded Google Credentials:', {
    clientIdExists: !!clientId,
    clientSecretExists: !!clientSecret,
  });

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
  //   pages: {
  //     signIn: '/login',
  //     signOut: '/logout',
  //   },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user && user.email && user.name) {
        await prisma.user.upsert({
          where: { email: user.email },
          update: { name: user.name, id: user.id, imageUrl: user.image || '' },
          create: {
            email: user.email,
            id: user.id,
            name: user.name,
            imageUrl: user.image || '',
          },
        });
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
