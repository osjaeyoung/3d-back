import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ConflictException } from 'src/libs/exception/conflict.exception';
import { CreateUserDto } from 'src/dto/user/create.user.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from 'src/libs/exception/badrequest.exception';
import { JwtService } from '@nestjs/jwt';

const expires_in = 1000 * 60 * 60; // 1 hour

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.userId = createUserDto.userId;
    user.pwd = createUserDto.pwd;
    user.email = createUserDto.email;

    const exist = await this.usersRepository.exists({
      where: { userId: user.userId },
    });

    if (exist) {
      throw new ConflictException('user already exist');
    }
    const registerdUser = await this.usersRepository.save(user);
    return new User(registerdUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByUserId(userId: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ userId });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  signin(user: User, pwd: string) {
    if (!user) {
      throw new BadRequestException('user ID or PASSWORD is incorrect');
    }

    const isValidPwd = bcrypt.compareSync(pwd, user.pwd);
    if (!isValidPwd) {
      throw new BadRequestException('user ID or PASSWORD is incorrect');
    }

    const current = Date.now();
    const iat = Math.floor(current / 1000);
    const exp = Math.floor((current + expires_in) / 1000);
    const payload = {
      sub: user.userId,
      iss: 'https://diypaper.net',
      exp,
      iat,
    };

    const accessToken = this.jwtService.sign(payload);
    return { accessToken, name: user.name, email: user.email };
  }
}
