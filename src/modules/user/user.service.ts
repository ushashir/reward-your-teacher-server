import { BadRequestException, Body, Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import { UserRolesEnum } from '../../common/enums';
import { CreateUserDto, UpdateUserDto } from './dtos/UserDto';
import { UserDocument } from './user.interface';
import { welcomeEmail } from 'src/common/mailSender/welcomeTemplate';
import mailer from 'src/common/mailSender/sendMail' 
const fromUser = process.env.FROM;
const jwtsecret = process.env.JWT_SECRETS ;


@Injectable()
export class UserService {
  constructor(
    @InjectModel(DbSchemas.user)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: string) {
    return this.userModel
      .findOne({
        email: {
          $regex: email,
          $options: 'i',
        },
      })
      .select('+password');
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
    
    if(createdUser){
      const subject = 'Welcome message';
      const mail = welcomeEmail(createUserDto.name, createUserDto.email);
      await mailer.sendEmail(fromUser, Req.name, subject, mail);
    }

    return {
      message: `${
        createUserDto.userType === UserRolesEnum.STUDENT ? 'Student' : 'Teacher'
      } successfully created`,
      user: createdUserObject,
    };
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException(ErrorMessages.userNotFound(id));
    }

    return user;
  }

  async updateMyProfile(user: UserDocument, updateUserDto: UpdateUserDto) {
    if (updateUserDto?.email && updateUserDto.email !== user.email) {
      const userExist = await this.getUserByEmail(updateUserDto.email);

      if (userExist) {
        throw new BadRequestException(ErrorMessages.USER_EXISTS);
      }
    }

    return this.userModel.findByIdAndUpdate(user._id, updateUserDto, {
      new: true,
    });
  }
}
