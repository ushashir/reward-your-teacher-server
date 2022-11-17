import {
  Body,
  Controller,
  Get,
  Patch,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
}
