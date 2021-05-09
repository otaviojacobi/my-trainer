module.exports = {
  env: {
    MY_TRAINER_BACKEND: process.env.MY_TRAINER_BACKEND,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || process.env.VERCEL_URL
  },
};
