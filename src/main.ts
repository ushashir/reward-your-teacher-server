import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Environment } from './common/enums';

const getAllowedOrigins = (environment: Environment) => {
  //TODO: add origins for staging and production environments

  return environment === Environment.DEVELOPMENT;
};

async function bootstrap() {
  // Create a factor app with logging functionalitiess
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    bufferLogs: true,
  });
  const port = process.env.port || 4000;
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
