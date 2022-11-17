import { Environment } from '../enums';

export interface IEnvironment {
  NODE_ENV: Environment;
  SERVER_PORT: number;
  MONGO_PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_ACCESS_TOKEN_TTL: number;
  JWT_REFRESH_TOKEN_TTL: number;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  BASE_URL: string;
  FRONTEND_URL: string;
  GMAIL_USER: string;
  GMAIL_PASS: string;
  FROM: string;
  PAYSTACK_PUBLIC_KEY: string;
  PAYSTACK_SECRET_KEY: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}
