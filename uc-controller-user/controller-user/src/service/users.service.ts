import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../dto/user.dto';
import { PrismaService } from './prisma.service';
import { User } from 'prisma/prismaAuthUserClient';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //use by auth module to register user in database
  

  //use by auth module to login user
  async findByPayload(userData: any): Promise<any> {}
  async create(userDto: any): Promise<any> {
    const data = await this.prisma.user
      .create({ data: userDto })
      .catch((err) => {
        console.log(err);
        throw new HttpException('Failed to create user', 400);
      });
      return data;
  }
  async findByLogin(userData: any): Promise<any> {
    console.log(userData);
    
    const data = await this.prisma.user
    .findFirst({
      where: {
        emailId: userData.username,
        password: userData.password
      },
    })
    .catch((err) => {
      console.log(err);
      throw new HttpException('User Doesnt Exist', 400);
    });
    console.log(data);
    return data;
  }

}

