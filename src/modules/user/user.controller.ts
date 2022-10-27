import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ValidIdDto } from 'src/common/dto';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { UserService } from './user.service';

// SAMPLE ROUTE
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUserById(@Param() { id }: ValidIdDto) {
    return this.userService.getUserById(+id);
  }

  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:id')
  updateUser(
    @Param() { id }: ValidIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(+id, updateUserDto);
  }
}
