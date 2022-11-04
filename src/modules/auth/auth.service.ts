import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas } from 'src/common/constants';
import { UserDocument } from '../user/schemas/interfaces/user.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UserService,
      private jwtService: JwtService
    ) {}
    
  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    
    if( user && user.password === password){
      return user
    }
    return null; 
  }
  
  async login(user: any) {
   
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
