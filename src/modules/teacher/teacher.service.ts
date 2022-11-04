import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import * as bcrypt from 'bcrypt'
import { CreateTeacherDto } from './dtos/CreateTeacherDto';
import { UpdateTeacherDto } from './dtos/UpdateTeacherDto';
import { TeacherDocument } from './interfaces/teacher.interface';

@Injectable()
export class TeacherService {
  private readonly logger = new Logger(TeacherService.name);

  constructor(
    // @InjectModel(DbSchemas.user)
    // private readonly userModel: Model<UserDocument>,

    @InjectModel(DbSchemas.teacher)
    private readonly teacherModel: Model<TeacherDocument>,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(createTeacherDto.password, saltOrRounds)
    const teacher =  await this.teacherModel.create({ ...createTeacherDto, password: passwordHash });
    return {
      message: 'Teacher successfully created',
      teacher
    }
  }

  async getTeacher() {
    return this.teacherModel.find();
  }

  async getTeacherById(id: string) {
    const teacher = await this.teacherModel.findById(id);

    if (!teacher) {
      this.logger.error('Teacher not found');
      throw new NotFoundException(ErrorMessages.noTeacher(id));
    }

    return teacher;
  }

  async updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto) {
    const existingTeacher = await this.getTeacherById(id);

    Object.assign(existingTeacher, updateTeacherDto);

    const updatedTeacher = await existingTeacher.save();

    return {
      message: 'Teacher record updated successfully',
      updatedTeacher
    };
  }

  async deleteTeacher(id: string) {
    const teacher = await this.getTeacherById(id);
    teacher.remove();
    return {
      message: `Teacher ${id} successfully deleted`,
      teacher
    }
  }
}
