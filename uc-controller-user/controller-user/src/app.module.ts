import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './service/users.service';
import { PrismaService } from './service/prisma.service';
import { ContactModule } from './contact/contact.module';
@Module({
  imports: [AuthModule, ContactModule],
  controllers: [AppController],
  providers: [AppService,PrismaService,UsersService],
})
export class AppModule {}
