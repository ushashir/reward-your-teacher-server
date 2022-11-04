import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/dtos/CreateUserDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  
  @Post('/login')
  async getLogin(@Request() req: any) {

    return this.authService.login(req.user);
  } 
    
    @Post('/signup')
    signupUser(@Body() createUserDto: CreateUserDto) {
      return this.authService.signup(createUserDto);
    }
}
