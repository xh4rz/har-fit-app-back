import { ApiProperty } from '@nestjs/swagger';

class UserData {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  fullName: string;

  @ApiProperty({ default: true })
  isActive: boolean;

  @ApiProperty({ example: ['user'], type: [String] })
  roles: string[];
}

export class AuthResponseDto {
  @ApiProperty({ type: UserData, description: 'User data (without password)' })
  user: UserData;

  @ApiProperty({
    description: 'JWT access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT access token for authentication',
    example: 'bcFdfdssddfsff505d5d5d1d5cCI6IkpXVJ9...',
  })
  refreshToken: string;
}
