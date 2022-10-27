import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { GenderEnum } from 'src/common/enums';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  private users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      gender: GenderEnum.MALE,
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      gender: GenderEnum.FEMALE,
    },
  ];

  getUsers() {
    this.logger.log(`Getting all users`);
    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      this.logger.error('User not found');
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.logger.log(`User with id ${id} found`);

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const lastUser = this.users.at(-1);
    const incrementedId = lastUser.id + 1;

    const newUser = {
      id: incrementedId,
      ...createUserDto,
    };

    this.users.push(newUser);

    this.logger.log('New user created -> ', newUser);

    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = this.getUserById(id);

    const updatedUser = {
      ...user,
      ...updateUserDto,
    };

    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }
}
