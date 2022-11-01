import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from 'src/common/constants';
import * as bcrypt from 'bcrypt'
import { CreateStudentDto } from './dtos/CreateStudentDto';
import { StudentDocument } from './schemas/interfaces/student.interface';
import { UpdateStudentDto } from './dtos/UpdateStudentDto';

@Injectable()
export class StudentService {
    private readonly logger = new Logger(StudentService.name);

    constructor(
        @InjectModel(DbSchemas.student)
        private readonly studentModel: Model<StudentDocument>,
    ) {}

    async createStudent(createStudentDto: CreateStudentDto) {
        const passwordHash = bcrypt.hashSync(createStudentDto.password, 8)
        const student = await this.studentModel.create({ ...createStudentDto, password: passwordHash });
        return {
            message: 'Student successfully created',
            student
        }
    }

    async getStudents() {
        return this.studentModel.find();
    }

    async getStudentById(id: string) {
        const student = await this.studentModel.findById(id);

        if (!student) {
            this.logger.error('Student not found');
            throw new NotFoundException(ErrorMessages.noStudent(id));
        }

        return student;
    }

    async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
        const existingStudent = await this.getStudentById(id);

        Object.assign(existingStudent, updateStudentDto);

        const updatedStudent = await existingStudent.save();

        return {
            message: 'Student record successfully updated',
            updatedStudent
        };
    }

    async deleteStudent(id: string) {
        const student = await this.getStudentById(id);
        student.remove();
        return {
            message: `Student ${id} successfully deleted`,
            student
        }
    }
}
