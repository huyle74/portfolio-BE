import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { UserDto } from './dtos/use.dto';
import { UserService } from './user.service';
import { Serialize } from './interceptor/user.interceptor';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  createUser(@Body() body: UserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
