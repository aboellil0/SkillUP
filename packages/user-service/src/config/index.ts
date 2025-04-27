import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY as string,
    refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY as string,
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.GOOGLE_CALLBACK_URL
    }
  }
};