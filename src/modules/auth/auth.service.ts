import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/CreateUserDto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
