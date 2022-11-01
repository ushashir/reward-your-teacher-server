import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ValidIdDto } from 'src/common/dto';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { UserService } from './user.service';

// SAMPLE ROUTE
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/')
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id/')
  async getUserById(@Param() { id }: ValidIdDto) {
    return this.userService.getUserById(id);
  }

  @Patch('/:id')
  async updateUser(
    @Param() { id }: ValidIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param() { id }: ValidIdDto) {
    return this.userService.deleteUser(id);
  }
}
