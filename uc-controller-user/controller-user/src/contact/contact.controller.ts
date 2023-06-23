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
    return this.contactService.getUser(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/createContact')
  async createUser(@Body() userData) {
    console.log(userData);
    
    return await this.contactService.createUser(userData.data);
  }

  @Post('/updateUser')
  async updateUser(userData:any){
    return await this.contactService.updateUser(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/deleteContact')
  async deleteUser(@Query() queryData){
    console.log(queryData);
    console.log("==================");
    
    
    return await this.contactService.deleteContact(queryData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getUserById')
  getUserById(@Query() queryData) {
    console.log();
    return this.contactService.getUserById(queryData);
  }
  
}
