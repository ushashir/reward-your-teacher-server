import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas, ErrorMessages } from '../../common/constants';
import { UserRolesEnum } from '../../common/enums';
import { dateRangeFilter, paginateAndSort } from '../../common/helpers';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { MailService } from '../mail/mail.service';
import { WalletService } from '../wallet/wallet.service';
import { GetUsersDto } from './dtos/GetUsersDto';
import { CreateUserDto, UpdateUserDto } from './dtos/UserDto';
import { LeanUser, UserDocument, UserFiles } from './user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(DbSchemas.user)
    private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService,
    private readonly mailService: MailService,
    private readonly cloudinaryService: CloudinaryService,
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

    const createWallet = await this.walletService.createWallet(
      createdUser._id.toString(),
    );

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

  async updateMyProfile(
    user: UserDocument,
    updateUserDto: UpdateUserDto,
    files: UserFiles,
  ) {
    if (updateUserDto?.email && updateUserDto.email !== user.email) {
      const userExist = await this.getUserByEmail(updateUserDto.email);

      if (userExist) {
        throw new BadRequestException(ErrorMessages.USER_EXISTS);
      }
    }

    let profilePictureLink = '';

    if (files?.profilePicture) {
      const { profilePicture } = files;

      const { secure_url } = await this.cloudinaryService.uploadImage(
        profilePicture[0],
      );

      profilePictureLink = secure_url;
    }

    return this.userModel.findByIdAndUpdate(
      user._id,
      {
        ...updateUserDto,
        ...(!!profilePictureLink && { profilePicture: profilePictureLink }),
      },
      {
        new: true,
      },
    );
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

  async paginate(getUsersDto: GetUsersDto) {
    const {
      sort,
      limit = 10,
      page = 1,
      name,
      email,
      userType,
      minCreatedAt,
      maxCreatedAt,
    } = getUsersDto;

    const filters = {
      ...(name && { name: new RegExp(name, 'i') }),
      ...(email && { email: new RegExp(email, 'i') }),
      ...(userType && { userType }),
      ...dateRangeFilter(minCreatedAt, maxCreatedAt, 'createdAt'),
    };

    return paginateAndSort({
      model: this.userModel,
      filters,
      sort,
      page,
      limit,
      options: {
        lean: true,
      },
    });
  }
}
