import {
    Body,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ValidIdDto } from '../../common/dto';
import { CreateStudentDto } from './dtos/CreateStudentDto';
import { UpdateStudentDto } from './dtos/UpdateStudentDto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {

    constructor(private readonly studentService: StudentService) {}

    @Post('/')
    async createStudent(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.createStudent(createStudentDto);
    }

    @Get('/')
    async getAllStudent() {
        return this.studentService.getStudents();
    }

    @Get('/:id/')
    async getStudentById(@Param() { id }: ValidIdDto) {
        return this.studentService.getStudentById(id);
    }

    @Patch('/:id')
    async updateStudent(
        @Param() { id }: ValidIdDto,
        @Body() updateStudentDto: UpdateStudentDto,
    ) {
        return this.studentService.updateStudent(id, updateStudentDto);
    }

    @Delete('/:id')
    async deleteStudent(@Param() { id }: ValidIdDto) {
        return this.studentService.deleteStudent(id);
    }
}
