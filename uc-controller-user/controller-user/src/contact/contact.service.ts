import { HttpException, Injectable } from '@nestjs/common';
import { createContactDto } from 'src/dto/contact.dto';
import { PrismaService } from '../service/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async getUser(query) {
    return;
  }

  getUserById(data: any) {
    return;
  }

  async createUser(userData) {
    return;
  }

  async deleteContact(userData) {
    return;
  }

}
