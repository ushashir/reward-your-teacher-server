import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from 'src/common/constants';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { UserDocument } from './schemas/interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    // @InjectModel(DbSchemas.user)
    // private readonly userModel: Model<UserDocument>,

    @InjectModel(DbSchemas.user)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async getUsers() {
    return this.userModel.find();
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      this.logger.error('User not found');
      throw new NotFoundException(ErrorMessages.noUser(id));
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.getUserById(id);

    Object.assign(existingUser, updateUserDto);

    const updatedUser = await existingUser.save();

    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);

    return user.remove();
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
