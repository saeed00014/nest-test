import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    console.log('we reached the logger');
    next();
  }
}
