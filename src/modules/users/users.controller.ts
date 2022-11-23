import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserInput) {
    const newUser = await this.usersService.create(createUserDto);
    delete newUser?.password;

    return newUser;
  }
}
