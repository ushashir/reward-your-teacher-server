export class ErrorMessages {
  static readonly TEACHER_NOT_FOUND = 'Teacher not found';
  static readonly STUDENT_NOT_FOUND = 'Student not found';

  static noTeacher(id: string) {
    return `Teacher with id ${id} not found`;
  }
  static noStudent(id: string) {
    return `Student with id ${id} not found`;
  }
}
