import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas } from 'src/common/constants';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { UserDocument } from './schemas/interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(DbSchemas.user)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async getUsers() {
    const users = await this.userModel.find();

    return users;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      this.logger.error('User not found');
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.logger.log(`User with id ${id} found`);

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.getUserById(id);

    Object.assign(existingUser, updateUserDto);

    const updatedUser = await existingUser.save();

    return updatedUser;
  }
}
