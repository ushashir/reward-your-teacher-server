import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import { UserRolesEnum } from '../../common/enums';
import { MailService } from '../mail/mail.service';
import { WalletService } from '../wallet/wallet.service';
import { CreateUserDto, UpdateUserDto } from './dtos/UserDto';
import { LeanUser, UserDocument } from './user.interface';
const fromUser = process.env.FROM;
const jwtsecret = process.env.JWT_SECRETS;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DbSchemas.user)
    private readonly userModel: Model<UserDocument>,
    readonly walletService: WalletService,
    private readonly mailService: MailService,
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

    const createWallet = await this.walletService.createWallet(createdUser);

    if (!createWallet) {
      throw new BadRequestException(ErrorMessages.FAILED_TO_CREATE_WALLET);
    }

    const createdUserObject = createdUser.toObject();

    delete createdUserObject.password;

    this.mailService.sendWelcomeEmail(
      createdUserObject.email,
      createdUserObject.name,
    );

    return {
      message: `${
        createUserDto.userType === UserRolesEnum.STUDENT ? 'Student' : 'Teacher'
      } successfully created`,
      user: createdUserObject,
    };
  }

  async getUserById(id: string): Promise<LeanUser> {
    const user = await this.userModel.findById(id).lean();

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

  async getAllTeachers() {
    const users = await this.userModel.find({
      userType: UserRolesEnum.TEACHER,
    });

    if (!users) {
      throw new BadRequestException(ErrorMessages.RECORD_NOT_FOUND);
    }

    return users;
  }
}
