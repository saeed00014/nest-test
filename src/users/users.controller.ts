import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { cacheInterceptor } from 'src/intercepters/cache.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(cacheInterceptor)
  @Get('/')
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/')
  createOne(@Body() user: any) {
    return this.usersService.createOne(user);
  }

  @Post('/auth')
  findOneUserByPassword(
    @Body() cordetials: { name: string; password: string },
  ) {
    return this.usersService.findOneUserByPassword(cordetials);
  }

  @Get('/auth/jwt')
  findOneUserByJwt(@Headers('auth') token: string) {
    return this.usersService.findOneUserByJwt(token);
  }
}
