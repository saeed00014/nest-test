import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  findAll() {
    return this.databaseService.user.findMany();
  }

  async findOneUserByPassword(cordetials: { name: string; password: string }) {
    if (!cordetials.name || !cordetials.password) return new Error();

    const foundedUserById = await this.databaseService.user.findFirst({
      where: {
        name: cordetials.name,
      },
    });

    const isMatch = await bcrypt.compare(
      cordetials.password,
      foundedUserById.password,
    );

    if (isMatch) {
      const token = this.jwtService.sign(foundedUserById);
      console.log(token);
      return foundedUserById;
    }

    throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
  }

  async findOneUserByJwt(token: string) {
    const isVerified = await this.jwtService.verifyAsync(token);
    console.log(isVerified);
  }

  async createOne(user: Prisma.UserCreateInput) {
    const userPassword = user.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    return this.databaseService.user.create({
      data: { ...user, password: hashedPassword },
    });
  }
}
