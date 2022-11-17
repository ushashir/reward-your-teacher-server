import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Profile, Strategy } from 'passport-google-oauth20';
import { UserDocument } from '../../user/user.interface';
import { UserService } from '../../user/user.service';
import { AuthPayload } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL:
        configService.get<string>('BASE_URL') + '/api/auth/google/redirect',
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const userAgent = request.headers['user-agent'];
    const { displayName, emails } = profile;

    const name = displayName;
    const email = emails[0].value;

    const existingUser = await this.userService.getUserByEmail(email);

    let authPayload: AuthPayload;

    if (existingUser) {
      // we just login the user
      authPayload = await this.authService.login(existingUser, userAgent);
    } else {
      // we signup the user

      const { user } = await this.userService.createUser({
        name,
        email,
      });

      authPayload = await this.authService.login(
        user as UserDocument,
        userAgent,
      );
    }

    return authPayload;
  }
}
