import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.MY_TRAINER_BACKEND}/auth/local`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          }
        );
        if (res.ok) {
          const user = await res.json();
          return {type: "credentials", ...user};
        } else {
          return null;
        }
      },
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    session: async (session, user) => {
      session.jwt = user.jwt;
      session.id = user.id;

      if(user.user) {
        session.user.name = user.user.username;
        session.user.email = user.user.email;
      }

      return Promise.resolve(session);
    },
    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        if(user.type === 'credentials') {
          token.jwt = user.jwt;
          token.id = user.user.id;
          token.user = user.user;
        } else {
          const response = await fetch(
            `${process.env.MY_TRAINER_BACKEND}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
          );
          const data = await response.json();
          token.jwt = data.jwt;
          token.id = data.user.id;
        }
      }
      
      return Promise.resolve(token);
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
