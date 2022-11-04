import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { jwtConstants } from '../auth.constant';
import { JwtPayload } from '../interfaces/auth.interface';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const { sub, jwtid } = payload;

    const validRefreshToken =
      await this.tokenService.getStoredValidRefreshTokenById(jwtid);

    if (!validRefreshToken) {
      return null;
    }

    const user = await this.userService.getUserById(sub);

    return user;
  }
}
