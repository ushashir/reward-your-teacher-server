import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import helmet from 'helmet';
import * as dotenv from 'dotenv' 
import { AppModule } from './app.module';
import { Environment } from './common/enums';
dotenv.config();


const getAllowedOrigins = (environment: Environment) => {
  //TODO: add origins for staging and production environments

  if (environment === Environment.DEVELOPMENT) {
    return ['http://localhost:3000'];
  }

  return '*';
};

async function bootstrap() {
  // Create a factor app with logging functionalitiess
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    bufferLogs: true,
  });
  const port = process.env.port || process.env.SERVER_PORT;
  const environment = process.env.NODE_ENV as Environment;

  app.use(helmet());

  // Setting the node process timezone
  process.env.TZ = 'Africa/Lagos';

  // TODO: This will be explained and we will uncomment it

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: environment !== Environment.PRODUCTION, // set to true on production
      transform: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      stopAtFirstError: true,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new BadRequestException(validationErrors, 'Bad Request'),
    }),
  );

  // This will prefix our routes with api i.e http://localhost:4000/api/*
  app.setGlobalPrefix('api');

  // We configure the cross origins to allow requests from our frontend
  app.enableCors({
    origin: getAllowedOrigins(environment),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
