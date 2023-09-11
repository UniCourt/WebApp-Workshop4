import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../users/users.user.dto';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'prisma/prismaAuthUserClient';

interface FormatLogin extends Partial<User> {
  login: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //use by user module to change user password
  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<any> {}

  //use by auth module to register user in database
  async create(userDto: CreateUserDto): Promise<any> {
    const data = await this.prisma.user
      .create({ data: userDto })
      .catch((err) => {
        console.log(err);
        throw new HttpException('Failed to create user', 400);
      });
      return data;
  }

  //use by auth module to login user
  async findByLogin(userData: any): Promise<any> {
    console.log("skldmowejdkekdoekodkeopkdopekdpokedko");
    
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
    console.log("---");
    console.log(data);
      
    return data;
  }

  async findByPayload(userData: any): Promise<any> {}
}
