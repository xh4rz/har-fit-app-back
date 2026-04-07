import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto, LoginUserDto, RefreshTokenDto } from './dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces';
import { DatabaseExceptionService } from 'src/common/services';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly databaseExceptionService: DatabaseExceptionService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      const { password, ...userData } = registerUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      const { password: _, ...restUser } = user;

      return {
        user: restUser,
        accessToken: this.getJwtAccessToken({
          id: user.id,
        }),
        refreshToken: await this.createRefreshToken(user),
      };
    } catch (error) {
      this.databaseExceptionService.handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
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

    return {
      user: restUser,
      accessToken: this.getJwtAccessToken({
        id: user.id,
      }),
      refreshToken: await this.createRefreshToken(user),
    };
  }

  private getJwtAccessToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async createRefreshToken(user: User) {
    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      },
    );

    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);

    await this.userRepository.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return refreshToken;
  }

  async refreshAccessToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { refreshToken } = refreshTokenDto;

      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.id },
        select: {
          id: true,
          refreshToken: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const isValid = bcrypt.compareSync(refreshToken, user.refreshToken);

      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newRefreshToken = await this.createRefreshToken(user);

      return {
        accessToken: this.getJwtAccessToken({ id: user.id }),
        refreshToken: newRefreshToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
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
}
