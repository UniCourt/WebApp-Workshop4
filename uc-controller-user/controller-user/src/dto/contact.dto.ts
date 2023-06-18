import { IsNotEmpty } from 'class-validator';

export class createContactDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  emailId: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  zipcode: number;

  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  phoneNumber: bigint;
}
