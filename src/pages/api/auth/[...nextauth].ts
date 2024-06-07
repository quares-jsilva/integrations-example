import NextAuth, { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
      accessToken?: string;
    }

    interface User {
        id?: string
        _id: string
    }
} 

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
    ],

    session: {
        maxAge: 259200,
        strategy: 'jwt',
        updateAge: 86400,
    },

    callbacks: {

        async jwt({ token, account, user }) {
        
            if( account ) {
                token.accessToken = account.access_token;
                token.user = user;
            }

            return token;
        },

        async session({ session, token }){
            session.accessToken = token.accessToken as any;
            session.user = token.user as any;

            return session;
        }

    },

    // Custom Pages
    pages: {
        signIn: '/auth/login',
    },
}

export default NextAuth(authOptions);