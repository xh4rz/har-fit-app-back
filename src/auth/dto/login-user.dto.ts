import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password1', minLength: 6, maxLength: 20 })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
