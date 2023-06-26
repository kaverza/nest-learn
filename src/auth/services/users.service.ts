import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/dto/user';
import { Signup } from '../interfaces/dto/signup';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: uuidv4(),
      password: '123',
      email: 'test@mail.ru',
      firstName: 'Ivan',
      lastName: 'Ivanov',
    },
  ];

  async findOne(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async create(dto: Signup): Promise<User> {
    const newUser: User = { id: uuidv4(), ...dto };
    this.users.push(newUser);

    return newUser;
  }
}
