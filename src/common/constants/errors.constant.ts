export class ErrorMessages {
  static readonly USER_NOT_FOUND = 'User not found';
  static readonly STUDENT_NOT_FOUND = 'Student not found';

  static noUser(id: string) {
    return `User with id ${id} not found`;
  }
  static noStudent(id: string) {
    return `Student with id ${id} not found`;
  }
}
