import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post('/apex')
  createUser(@Req() request: Request, @Res() response: Response){
    const {username, email} = request.body
    return response.send("Created from here"); 
    return console.log(request.body)
    
  }
}
