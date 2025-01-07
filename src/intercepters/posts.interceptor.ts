import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

export class postsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('...Before');

    const now = Date.now();
    // return next
    //   .handle()
    //   .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    return next.handle().pipe(
      map((data) => {
        if (data) return data;
      }),
    );
  }
}
