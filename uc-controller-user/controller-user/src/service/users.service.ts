import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../dto/user.dto';
import { PrismaService } from './prisma.service';
import { User } from 'prisma/prismaAuthUserClient';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //use by auth module to register user in database
  async create(userDto: CreateUserDto): Promise<any> {
    return;
  }

  //use by auth module to login user
  async findByLogin(userData: any): Promise<any> {
    return;
  }

  async findByPayload(userData: any): Promise<any> {}
}
