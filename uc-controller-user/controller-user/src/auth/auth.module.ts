import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../service/users.service';
import { PrismaService } from '../service/prisma.service';
@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService],
  exports: [],
})
export class AuthModule {}
