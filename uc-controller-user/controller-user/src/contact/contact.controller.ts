import { Controller, Delete, Query, Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { createContactDto } from 'src/dto/contact.dto';
import { JwtAuthGuard } from "../authGuard/jwt-auth.guard";
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('/getContact')
  getUser(@Query() query) {    
    return;
  }

  @Post('/createContact')
  async createUser(@Body() userData) {
    console.log(userData);
    return;
  }

  @Delete('/deleteContact')
  async deleteUser(@Query() queryData){
    console.log(queryData);
    return;
  }

  @Get('/getUserById')
  getUserById(@Query() queryData) {
    console.log();
    return;
  }
  
}
