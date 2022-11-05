import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UserDocument } from '../user/schemas/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../user/dtos/CreateUserDto';
import { RefreshTokenDto } from '../../user/dtos/RefreshTokenDto';
import { UserDocument } from '../../user/user.interface';
import { UserService } from '../../user/user.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }
    return null;
  }

  async login(user: UserDocument, userAgent: string) {
    // GENERATE A REFRESH TOKEN
    const refreshToken = await this.tokenService.generateRefreshToken(
      user,
      userAgent,
    );

    const { jwtid } = await this.tokenService.decodeRefreshToken(refreshToken);

    // GENERATE AN ACCESS TOKEN

    const { accessToken, expiresIn } =
      await this.tokenService.generateAccessToken(user._id, jwtid);

    return this.buildResponse(accessToken, refreshToken, expiresIn, user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    const { accessToken, expiresIn } =
      await this.tokenService.generateAccessTokenFromRefreshToken(refreshToken);

    return this.buildResponse(accessToken, refreshToken, expiresIn);
  }

  private buildResponse(
    accessToken: string,
    refreshToken: string,
    expiresIn: number, // in milliseconds
    user?: UserDocument,
  ) {
    return {
      message: 'Login successful',
      accessToken,
      refreshToken,
      expiresIn,
      ...(user && { user }),
    };
  }
}
