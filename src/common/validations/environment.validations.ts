import { plainToClass } from 'class-transformer';
import { IsEnum, validateSync } from 'class-validator';
import { Environment } from '../enums';

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
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
