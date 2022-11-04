import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import { UserRolesEnum } from '../../common/enums';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UserDocument } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DbSchemas.user)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: string) {
    return this.userModel.findOne({
      email: {
        $regex: email,
        $options: 'i',
      },
    }).select('+password') as unknown as CreateUserDto;
  }

  async createUser(createUserDto: CreateUserDto) {
    const userExist = await this.getUserByEmail(createUserDto.email);

    if (userExist) {
      throw new BadRequestException(ErrorMessages.USER_EXISTS);
    }

    const createdUser = await this.userModel.create({
      ...createUserDto,
    });

    const createdUserObject = createdUser.toObject();

    delete createdUserObject.password;

    return {
      message: `${
        createUserDto.userType === UserRolesEnum.STUDENT ? 'Student' : 'Teacher'
      } successfully created`,
      [createUserDto.userType.toLowerCase()]: createdUserObject,
    };
  }

  // async findUserByEmail(email: string) {
  //   return this.userModel.findOne({ email }).select('+password').exec(function (err, user){
  //     return user
  //   });
  // }
}
