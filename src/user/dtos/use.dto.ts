import { IsString, IsEmail } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

export class UserDto {
  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Exclude()
  password: string;
}
