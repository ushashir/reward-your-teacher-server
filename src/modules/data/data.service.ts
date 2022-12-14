import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  private readonly schools = [
    {
      id: 1,
      name: 'Mainland Senior High School',
    },

    {
      id: 2,
      name: 'Wesley Girls Junior Secondary School',
    },

    {
      id: 3,
      name: 'Ebute- Metta High School',
    },
  ];

  private readonly subjects = [
    'Mathematics',
    'English',
    'Biology',
    'Chemistry',
    'Physics',
    'Geography',
    'Economics',
  ];

  getAllSchools() {
    return [...this.schools];
  }

  getAllSubjects() {
    return [...this.subjects];
  }
}
