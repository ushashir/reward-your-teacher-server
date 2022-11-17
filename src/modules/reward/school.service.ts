import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas } from '../../common/constants';
import { UserDocument } from '../user/user.interface';
import { RewardDocument } from './interfaces/reward.interface';
import { UserService } from '../user/user.service';
import { SchoolDocument } from './interfaces/school.interface';
import { TeacherDocument } from './interfaces/teacher.interface';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(DbSchemas.school)
    private readonly rewardModel: Model<RewardDocument>,
    private readonly schoolModel: Model<SchoolDocument>,
    private readonly teacherModel: Model<TeacherDocument>,
    private readonly userModel: Model<UserDocument>,
    readonly userService: UserService,
  ) {}

  // async Send(user: UserDocument, reward: RewardDocument) {
  //   //   const userExist = await this.userModel.findOne({})
  //   return await this.rewardModel.create({
  //     // userId: id,
  //     // receiverId,
  //     // amount,
  //     // email,
  //   });
  // }
}
