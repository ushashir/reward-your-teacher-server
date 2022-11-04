import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/CreateUserDto';
import { RefreshTokenDto } from '../user/dtos/RefreshTokenDto';
import { UserDocument } from '../user/user.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
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
  getProfile(@Request() req: Request & { user: UserDocument }) {
    return req.user;
  }
}
