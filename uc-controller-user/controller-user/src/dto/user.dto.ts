import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {}

export  class CreateUserDto {
    @IsNotEmpty()
    firstName: string;
  
    @IsNotEmpty()
    lastName: string;
  
    @IsNotEmpty()
    emailId: string;
  
    @IsNotEmpty()
    password: string;
  }

export class UpdatePasswordDto {}
