import { Environment } from 'src/common/enums';

export interface HealthCheckError {
  status: number;
  success: false;
  message: string;
  error: string;
}

export interface HealthCheckSuccess {
  status: number;
  success: true;
  message: string;
  data: {
    environment: Environment;
    baseUrl: string;
  };
}
