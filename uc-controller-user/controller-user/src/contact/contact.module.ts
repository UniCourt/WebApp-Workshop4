import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaService } from '../service/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [ContactService,PrismaService],
  controllers: [ContactController],
})
export class ContactModule {}
