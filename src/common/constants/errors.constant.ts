export class ErrorMessages {
  static USER_EXISTS = 'User already exists';
  static EXPIRED_REFRESH_TOKEN = 'Refresh token has expired';
  static INVALID_REFRESH_TOKEN = 'Refresh token is invalid';
  static FAILED_TO_CREATE_WALLET = 'Error occured, please try again';
  static INSUFFICIENT_FUND = 'Insufficient fund';
  static INVALID_WITHDRAWAL_AMOUNT = 'Invalid withdrawal amount';
  static INVALID_REQUEST = 'Invalid transaction request';
  static RECORD_NOT_FOUND = 'Record not found';
  static CANNOT_GET_FOR_STUDENT = 'Cannot get Total Money Recieved for Student';
  static TEACHER_CANNOT_TRANSFER = 'Only students can transfer';
  static CANNOT_TRANSFER_TO_STUDENT = 'Cannot transfer to student';
  static PAYMENT_NOT_INITIALIZED = 'Payment not initialized';
  static PAYMENT_ALREADY_VERIFIED = 'Payment is already verified';
  static PAYMENT_EMAIL_MISMATCH = 'Payment email mismatch';

  static userNotFound(id: string) {
    return `User with id ${id} not found`;
  }

  static userEmailNotFound(email: string) {
    return `${email} does not exist`;
  }
}
