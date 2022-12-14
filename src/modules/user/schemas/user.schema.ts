import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError } from 'mongoose';
import { UserRolesEnum } from '../../../common/enums';

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

  @Prop()
  phoneNumber?: string;

  @Prop()
  schoolId?: number;

  @Prop()
  periodOfTeaching?: string;

  @Prop()
  subjects?: string[];

  @Prop()
  profilePicture?: string;

  @Prop()
  position?: string;

  @Prop()
  about?: string;
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
