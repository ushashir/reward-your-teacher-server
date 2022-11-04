import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: `${GOOGLE_CLIENT_ID}`,
      clientSecret: `${GOOGLE_CLIENT_SECRET}`,
      callbackURL: `${GOOGLE_CALLBACK_URL}`,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });
    console.log('Validate');
    console.log(user);
    return user || null;
  }
}
