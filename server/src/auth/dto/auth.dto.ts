import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_\-!?])(?=\S+$).*$/, {
    message:
      'Password must contain at least 8 characters with at least one letter, one digit, and one special character',
  })
  password: string;
}
