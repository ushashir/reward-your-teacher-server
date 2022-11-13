export class ErrorMessages {
  static USER_EXISTS = 'User already exists';
  static EXPIRED_REFRESH_TOKEN = 'Refresh token has expired';
  static INVALID_REFRESH_TOKEN = 'Refresh token is invalid';
  static FAILED_TO_CREATE_WALLET = 'Error occured, please try again';
  static INSUFFICIENT_FUND = 'Insufficient fund';
  static INVALID_WITHDRAWAL_AMOUNT = 'Invalid withdrawal amount';
  static INVALID_REQUEST = 'Invalid transaction request'

  static userNotFound(id: string): any {
    return `User with id ${id} not found`;
  }

  static userEmailNotFound(email: string): any {
    return `${email} does not exist`;
  }
}
