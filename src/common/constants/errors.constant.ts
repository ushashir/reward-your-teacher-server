export class ErrorMessages {
  static readonly USER_NOT_FOUND = 'User not found';
  static noUser(id: string) {
    return `User with id ${id} not found`;
  }
}
