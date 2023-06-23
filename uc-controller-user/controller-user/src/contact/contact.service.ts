import { HttpException, Injectable } from '@nestjs/common';
import { createContactDto } from 'src/dto/contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async getUser(query) {
    console.log(query);
    
    const data = await this.prisma.contact.findMany({where:{userId: 1}}).catch((err) => {
      console.log(err);
      throw new HttpException(err, 400);
    });
    return data;
  }

  getUserById(data: any) {
    console.log(data);
    
    return this.prisma.contact.findFirst({ where: { id: parseInt(data.contactId),userId: parseInt(data.userId) } });
  }

  async createUser(userData: createContactDto) {
    console.log("userData ===>",userData);
    
    const data = await this.prisma.contact
      .create({ data: userData })
      .catch((err) => {
        console.log(err);
        throw new HttpException(err, 400);
    });
    return data;
  }

  async deleteContact(userData) {
    const data = await this.prisma.contact
      .deleteMany({
        where: { id: parseInt(userData.contactId), userId: parseInt(userData.userId) },
      })
  }

  updateUser(userData: any) {}
}
