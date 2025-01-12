import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CustomEnv } from './envv/env.get.custom';

@Module({
  imports: [
    // UsersModule,
    // DatabaseModule,
    // PostsModule,
    ConditionalModule.registerWhen(UsersModule, () => {
      return process.env.PORT == '3000' ? true : false;
    }),
    ConfigModule.forRoot({
      envFilePath: ['env/development.env', '.env'],
      expandVariables: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string(),
        PORT: Joi.number(),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CustomEnv,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
