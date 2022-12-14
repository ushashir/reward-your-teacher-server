import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUsersDto } from './dtos/GetUsersDto';
import { UpdateUserDto } from './dtos/UserDto';
import { UserFiles } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/update-me')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'profilePicture', maxCount: 1 }]),
  )
  updateProfile(
    @GetUser() user,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles()
    files: UserFiles,
  ) {
    return this.userService.updateMyProfile(user, updateUserDto, files);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all-teachers')
  getAllTeachers() {
    return this.userService.getAllTeachers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAllUsers(@Query() getUsersDto: GetUsersDto) {
    return this.userService.paginate(getUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/student/:id')
  getTotal(@Param('id') id: string) {
    return this.userService.getStudent(id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Get('/school-teachers/:id')
  getAllSchoolTeachers(@Param('id') schoolId: string) {
    return this.userService.getAllSchoolTeachers(+schoolId);
  }
}
