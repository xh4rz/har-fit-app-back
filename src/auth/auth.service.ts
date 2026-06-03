import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto, LoginUserDto } from './dto';
import { User } from '@/auth/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DatabaseExceptionService } from '@/common/services';
import { ClientTypeValue, JwtPayload } from './interfaces';
import type { CookieOptions, Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly databaseExceptionService: DatabaseExceptionService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    registerUserDto: RegisterUserDto,
    clientType: ClientTypeValue,
    response: Response,
  ) {
    try {
      const { password, ...userData } = registerUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      const { password: _, ...restUser } = user;

      const tokens = this.generateTokens({ id: user.id });

      await this.saveHashedRefreshToken(user.id, tokens.refreshToken);

      return {
        user: restUser,
        ...this.handleAuthResponse(clientType, response, tokens),
      };
    } catch (error) {
      this.databaseExceptionService.handleDBExceptions(error);
    }
  }

  async login(
    loginUserDto: LoginUserDto,
    clientType: ClientTypeValue,
    response: Response,
  ) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        fullName: true,
        isActive: true,
        roles: true,
      },
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    const { password: _, ...restUser } = user;

    const tokens = this.generateTokens({ id: user.id });

    await this.saveHashedRefreshToken(user.id, tokens.refreshToken);

    return {
      user: restUser,
      ...this.handleAuthResponse(clientType, response, tokens),
    };
  }

  async refreshAccessToken(
    request: Request,
    response: Response,
    clientType: ClientTypeValue,
  ) {
    try {
      let refreshToken: string | undefined;

      if (clientType === 'mobile') {
        refreshToken = request.body?.refreshToken;
      } else {
        refreshToken = request.cookies?.refreshToken;
      }

      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token missing');
      }

      const tokens = await this.validateAndGenerateTokens(refreshToken);

      return this.handleAuthResponse(clientType, response, tokens);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(request: Request, response: Response) {
    try {
      const refreshToken = request.cookies?.refreshToken;

      if (refreshToken) {
        const payload = this.jwtService.verify(refreshToken, {
          secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        });

        await this.userRepository.update(payload.id, {
          refreshToken: null,
        });
      }

      return { ok: true };
    } catch {
      return { ok: true };
    } finally {
      const cookieOptions = this.getCookieOptions();
      response.clearCookie('accessToken', cookieOptions);
      response.clearCookie('refreshToken', cookieOptions);
    }
  }

  async findUserById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        isActive: true,
        roles: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private generateAccessToken(payload: JwtPayload) {
    const expiresIn = this.configService.get<number>(
      'jwt.accessTokenExpirationMs',
    )!;

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.accessTokenSecret'),
      expiresIn: `${expiresIn}ms`,
    });
  }

  private generateRefreshToken(payload: JwtPayload) {
    const expiresIn = this.configService.get<number>(
      'jwt.refreshTokenExpirationMs',
    )!;

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refreshTokenSecret'),
      expiresIn: `${expiresIn}ms`,
    });
  }

  private generateTokens(payload: JwtPayload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private async saveHashedRefreshToken(userId: string, refreshToken: string) {
    const hashed = bcrypt.hashSync(refreshToken, 10);

    await this.userRepository.update(userId, {
      refreshToken: hashed,
    });
  }

  private setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const accessExpirationMs = this.configService.get<number>(
      'jwt.accessTokenExpirationMs',
    )!;

    const refreshExpirationMs = this.configService.get<number>(
      'jwt.refreshTokenExpirationMs',
    )!;

    const cookieOptions = this.getCookieOptions();

    response.cookie('accessToken', accessToken, {
      ...cookieOptions,
      expires: new Date(Date.now() + accessExpirationMs),
    });

    response.cookie('refreshToken', refreshToken, {
      ...cookieOptions,
      expires: new Date(Date.now() + refreshExpirationMs),
    });
  }

  private async validateAndGenerateTokens(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('jwt.refreshTokenSecret'),
    });

    const user = await this.userRepository.findOne({
      where: { id: payload.id },
      select: {
        id: true,
        refreshToken: true,
      },
    });

    if (!user?.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isValid = bcrypt.compareSync(refreshToken, user.refreshToken);

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = this.generateTokens({ id: user.id });

    await this.saveHashedRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private handleAuthResponse(
    clientType: ClientTypeValue,
    response: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    if (clientType === 'mobile') {
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    }

    this.setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    return {};
  }

  private getCookieOptions(): CookieOptions {
    const isProd = this.configService.get<string>('nodeEnv') === 'production';

    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
    };
  }
}
