import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
<<<<<<< HEAD
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CustomEnv } from './envv/env.get.custom';
=======
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http.filter';
import { TimeOutInterceptor } from './intercepters/timeOut.interceptor';
import { LoggerMiddleware } from './middlewares/logger.middleware';
>>>>>>> 6d0b07469be2930f60573f65bae4a3c6a54eb224

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'users', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
