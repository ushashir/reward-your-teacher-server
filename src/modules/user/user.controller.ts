import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dtos/UserDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/update-me')
  updateProfile(
    @GetUser() user,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateMyProfile(user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all-teachers')
  getAllTeachers() {
    return this.userService.getAllTeachers();
  }
}
