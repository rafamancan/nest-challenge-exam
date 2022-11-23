import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/user';
import { UserRepository } from './repositories';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(data: CreateUserInput) {
    const userData = {
      ...data,
      password: hashSync(data.password, 10),
    } as CreateUserInput;
    return this.usersRepository.create(userData);
  }

  async findOneOrFail(username: string) {
    return this.usersRepository.find(username);
  }
}
