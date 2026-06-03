import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private readonly baseSelect = {
    id: true,
    email: true,
    fullName: true,
    isActive: true,
    roles: true,
  };

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.save(createUserDto);

    return this.findByUserId(user.id);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByUserId(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: this.baseSelect,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      select: {
        ...this.baseSelect,
        password: true,
      },
    });
  }

  async findForJwtValidation(userId: string) {
    return await this.usersRepository.findOneBy({
      id: userId,
    });
  }

  async findByIdWithRefreshToken(userId: string) {
    return await this.usersRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        refreshToken: true,
      },
    });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return await this.usersRepository.update(userId, {
      refreshToken,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
