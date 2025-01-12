import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { CustomEnv } from './envv/env.get.custom';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    private customEnv: CustomEnv,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.configService.get<string>('DATABASE_URL'));
    console.log(this.configService.get<string>('DATABASE_URL2'));
    console.log(this.configService.get<string>('ALLUSERSPROFILE'));
    console.log(this.configService.get<string>('PORT'));
    console.log(this.customEnv.isAuthEnabled);
    return this.appService.getHello();
  }
}
