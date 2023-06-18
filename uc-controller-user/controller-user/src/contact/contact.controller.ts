import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { createContactDto } from 'src/dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}
  @Get('/getUser')
  getUser(userData:any) {
    return this.contactService.getUser(userData);
  }

  @Post('/createUser')
  async createUser(userData: createContactDto) {
    return await this.contactService.createUser(userData);
  }

  @Post('/updateUser')
  async updateUser(userData:any){
    return await this.contactService.updateUser(userData);
  }

  @Delete('/deleteUser')
  async deleteUser(userData:any){
    return await this.contactService.deleteUser(userData);
  }

  @Get('/getUserById/:id')
  getUserById(@Param('id') id) {
    return this.contactService.getUserById(id);
  }
  
}
