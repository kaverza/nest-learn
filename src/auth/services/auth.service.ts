import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Signup } from '../interfaces/dto/signup';
import { Signin } from '../interfaces/dto/signin';
import { UsersService } from './users.service';
import { ShortUser } from '../interfaces/dto/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signup(dto: Signup): Promise<ShortUser | null> {
    const user = await this.usersService.findOne(dto.email);

    if (user) {
      throw new BadRequestException('Пользователь уже зарегистрирован');
    }

    return await this.usersService
      .create(dto)
      .then(({ password: _, ...result }) => result);
  }

  public async signin({ email, password }: Signin): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      const { password: _, ...result } = user;

      return {
        access_token: await this.jwtService.signAsync(result),
      };
    }

    throw new UnauthorizedException('Неверный логин или пароль');
  }
}
