import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbSchemas } from 'src/common/constants';
// import { UserDocument } from '../user/schemas/interfaces/user.interface';
import { CreateUserDto } from '../user/dtos/CreateUserDto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UserService,
      private jwtService: JwtService
    ) {}

    async signup(createUserDto: CreateUserDto) {
      return this.userService.createUser(createUserDto);
    }
    
  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email) as unknown as CreateUserDto;

    const isMatch = await bcrypt.compare(password, user.password);
    
    if( user && isMatch){
      return user
    }
    return null; 
  }
  
  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      message: 'Login successful',
      user,
      access_token: this.jwtService.sign(payload),
    };
}
}

//   constructor(private readonly userService: UserService) {}

//   async signup(createUserDto: CreateUserDto) {
//     return this.userService.createUser(createUserDto);
//   }
// }
