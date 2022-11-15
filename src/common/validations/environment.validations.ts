import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import * as dotenv from 'dotenv';
import { Environment } from '../enums';
dotenv.config();

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  SERVER_PORT: number;

  @IsNumber()
  MONGO_PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_ACCESS_TOKEN_TTL: number;

  @IsNumber()
  JWT_REFRESH_TOKEN_TTL: number;

  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  BASE_URL: string;

  @IsString()
  FRONTEND_URL: string;

  @IsString()
  GMAIL_USER: string;

  @IsString()
  GMAIL_PASS: string;

  @IsString()
  FROM: string;

  @IsString()
  PAYSTACK_PUBLIC_KEY: string;

  @IsString()
  PAYSTACK_SECRET_KEY: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
