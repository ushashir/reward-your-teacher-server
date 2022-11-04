import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ValidIdDto } from '../../common/dto';
import { CreateTeacherDto } from './dtos/CreateTeacherDto';
import { UpdateTeacherDto } from './dtos/UpdateTeacherDto';
import { TeacherService as TeacherService } from './teacher.service';

// SAMPLE ROUTE
@Controller('teachers')
export class TeacherController {
  constructor(private readonly TeacherService: TeacherService) {}

  @Post('/')
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.TeacherService.createTeacher(createTeacherDto);
  }

  @Get('/')
  async getAllTeachers() {
    return this.TeacherService.getTeacher();
  }

  @Get('/:id/')
  async getTeacherById(@Param() { id }: ValidIdDto) {
    return this.TeacherService.getTeacherById(id);
  }

  @Patch('/:id')
  async updateTeacher(
    @Param() { id }: ValidIdDto,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.TeacherService.updateTeacher(id, updateTeacherDto);
  }

  @Delete('/:id')
  async deleteTeacher(@Param() { id }: ValidIdDto) {
    return this.TeacherService.deleteTeacher(id);
  }
}
