import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import { Auth, AuthResponses, GetUser } from './decorators';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthResponses('Register')
  @Post('register')
  createUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @AuthResponses('Login')
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Auth()
  @Post('logout')
  logout(@GetUser('id') userId: string) {
    return this.authService.logout(userId);
  }
}
