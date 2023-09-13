import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { JwtPayload } from './jwt.strategy';
import { PrismaService } from '../service/prisma.service';
import { User } from 'prisma/prismaAuthUserClient';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    return;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    return;
  }

  private async _createToken(userData): Promise<any> {
    return;
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return;
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
