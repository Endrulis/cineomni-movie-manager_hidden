import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCurrentUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
