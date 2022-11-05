import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { GetUser } from '../../common/decorators';
import { RefreshTokenDto } from '../user/dtos/RefreshTokenDto';
import { CreateUserDto } from '../user/dtos/UserDto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthPayload } from './interfaces/auth.interface';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async getLogin(@Request() req: any, @Headers() headers: Headers) {
    const userAgent = headers['user-agent'];

    return this.authService.login(req.user, userAgent);
  }

  @Post('/signup')
  signupUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('/refresh')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@GetUser() user) {
    return user;
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // Nothing
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(
    @Request() req: Request & { user: AuthPayload },
    @Res() res: Response,
  ) {
    const authPayload = req.user;

    this.authService.googleLogin(authPayload, res);
  }
}
