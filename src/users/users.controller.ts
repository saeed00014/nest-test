import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { cacheInterceptor } from 'src/intercepters/cache.interceptor';
import { User } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/compositeAuth.decorator';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private reflector: Reflector,
  ) {}

  @UseInterceptors(cacheInterceptor)
  @Get('/')
  @Auth(['admin'])
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  findAll(@Req() req: Request) {
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

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: Number) {
    return this.usersService.updateUser(id);
  }
}
