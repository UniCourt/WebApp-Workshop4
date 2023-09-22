import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../dto/user.dto';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //use by auth module to register user in database
  async create(userDto: any): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userDto.password, salt);
    userDto.password = hashPassword;
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
    console.log(userData);
  
  //const match = await bcrypt.compare(password, user.password);
  const user = await this.prisma.user.findFirst({ 
    where: { 
      emailId: userData.username,
    },
  }).catch((err) => { 
    console.log(err);
    throw new HttpException('User Doesnt Exist', 400);
  });
  /*
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
  */
  const match = await bcrypt.compare(userData.password, user.password);
  if (match) {
    return user;
  } else {
    return null;
  }
  }
  
  async findByPayload(userData: any): Promise<any> {}

  
}

