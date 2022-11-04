export class ErrorMessages {
  static USER_EXISTS = 'User already exists';
  static EXPIRED_REFRESH_TOKEN = 'Refresh token has expired';
  static INVALID_REFRESH_TOKEN = 'Refresh token is invalid';

  static userNotFound(id: string): any {
    return `User with id ${id} not found`;
  }
}
