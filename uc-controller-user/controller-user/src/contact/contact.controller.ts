import { Controller, Delete, Query, Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { createContactDto } from 'src/dto/contact.dto';
import { JwtAuthGuard } from "../authGuard/jwt-auth.guard";
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/getContact')
  getUser(@Query() query) {    
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/createContact')
  async createUser(@Body() userData) {
    console.log(userData);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteContact')
  async deleteUser(@Query() queryData){
    console.log(queryData);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getUserById')
  getUserById(@Query() queryData) {
    console.log();
    return;
  }
  
}
