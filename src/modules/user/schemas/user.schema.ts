import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError } from 'mongoose';
import { GenderEnum, UserRolesEnum } from '../../../common/enums';

import * as bcrypt from 'bcryptjs';

@Schema()
export class User {
  @Prop({
    trim: true,
    required: true,
  })
  name: string;

  @Prop({
    trim: true,
    required: true,
    unique: true,
    email: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    select: false,
  })
  password?: string;

  @Prop({
    enum: [UserRolesEnum.TEACHER, UserRolesEnum.STUDENT],
    uppercase: true,
  })
  userType?: UserRolesEnum;

  @Prop({
    type: String,
    enum: [GenderEnum.FEMALE, GenderEnum.MALE],
    uppercase: true,
  })
  gender?: GenderEnum;

  @Prop()
  phoneNumber?: string;

  @Prop()
  school?: string;

  @Prop()
  years?: string;

  @Prop()
  subject?: string;

  @Prop()
  profilePicture?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre(
  'save',
  async function (next: CallbackWithoutResultAndOptionalError) {
    if (this.isModified('password')) {
      const saltOrRounds = 10;
      const passwordHash = await bcrypt.hash(this.password, saltOrRounds);
      this.password = passwordHash;
    }

    return next();
  },
);
