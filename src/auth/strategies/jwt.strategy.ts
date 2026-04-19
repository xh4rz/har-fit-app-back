import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET') as string,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.accessToken,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) throw new UnauthorizedException('Token not valid');

    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    return user;
  }
}
