import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../dto/user.dto';
import { PrismaService } from './prisma.service';
import { User } from 'prisma/prismaAuthUserClient';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findByPayload(userData: any): Promise<any> {}
  async create(userDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    console.log("hashed password",hashedPassword)
    const data = await this.prisma.user
      .create({
        data: {
          firstName: userDto.firstName,
          lastName: userDto.lastName,
          emailId: userDto.emailId,
          password: hashedPassword, // Save the hashed password
        },
      })
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
        emailId: userData.username
      },
    })
    .catch((err) => {
      console.log(err);
      throw new HttpException('User Doesnt Exist', 400);
    });
    console.log("password---------->",data.password);
    console.log(data);
    return data;
  }

}

