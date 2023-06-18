import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty() readonly login: string;
  @IsNotEmpty() readonly password: string;
}
export class CreateUserDto {
    
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  emailId: string;

  @IsNotEmpty()
  password: string;
}
export class UpdatePasswordDto {
  @IsNotEmpty()
  new_password: string;

  @IsNotEmpty()
  old_password: string;
}
