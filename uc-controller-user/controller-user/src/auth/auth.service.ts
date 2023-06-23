import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../users/users.user.dto';
import { JwtPayload } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'prisma/prismaAuthUserClient';
import { hash } from 'bcrypt';
// import {User} from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS',
    };

    try {
      status.data = await this.usersService.create(userDto);
    } catch (err) {
      console.log(err);
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);
    if(!user){
      return;
    }
    // generate and sign token
    const token = await this._createToken(user);

    return {
      ...token,
      data: user,
    };
  }

  private _createToken(userData): any {
    
    const user: JwtPayload = { userId: userData.id, userEmailId:userData.emailId };
    console.log(user);
    
    const Authorization = this.jwtService.sign(user);
    console.log(Authorization);
    
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async validateToken(token){
    const payload = await this.jwtService.verifyAsync(
          token,
          {
          secret: process.env.SECRETKEY
          }
      );
    return payload;
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: User[];
}
