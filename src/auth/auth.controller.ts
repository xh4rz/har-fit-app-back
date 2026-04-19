import { Controller, Post, Body, Get, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import { Auth, AuthResponses, ClientType, GetUser } from './decorators';
import { type Request, type Response } from 'express';
import type { ClientTypeValue } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthResponses('Register')
  @Post('register')
  createUser(
    @Body() registerUserDto: RegisterUserDto,
    @ClientType() clientType: ClientTypeValue,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.register(registerUserDto, clientType, response);
  }

  @AuthResponses('Login')
  @Post('login')
  loginUser(
    @Body() loginUserDto: LoginUserDto,
    @ClientType() clientType: ClientTypeValue,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginUserDto, clientType, response);
  }

  @Post('refresh-token')
  refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @ClientType() clientType: ClientTypeValue,
  ) {
    return this.authService.refreshAccessToken(request, response, clientType);
  }

  @Post('logout')
  logoutUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(request, response);
  }

  @Auth()
  @Get('user')
  getUser(@GetUser('id') userId: string) {
    return this.authService.findUserById(userId);
  }
}
