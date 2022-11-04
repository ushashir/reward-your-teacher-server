import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
 import { AuthService } from './auth.service';
import { LoginDto } from './dtos/LoginDto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  
  // @Post('/login')
  // async getLogin(@Body() LoginDto: LoginDto) {
  //   return this.authService.validateUser(LoginDto.email, LoginDto.password);
  // } 

  @Post('/login')
  async getLogin(@Request() req: any) {
    console.log(req.user)
    // return await req.user
    return this.authService.login(req.user);
  } 
}
