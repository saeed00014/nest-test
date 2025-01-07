import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PostsService } from './posts.service';
import { authGuard } from 'src/guards/auth.guard';
import { postPipe } from 'src/pipes/posts.pipe';
import { postSchema } from 'src/zod/zod';
import { postsInterceptor } from 'src/intercepters/posts.interceptor';
import { TimeOutInterceptor } from 'src/intercepters/timeOut.interceptor';

// []
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @UseGuards(authGuard)
  // @UsePipes(new postPipe(postSchema))
  // @UseInterceptors(postsInterceptor)
  @UseInterceptors(TimeOutInterceptor)
  @Post()
  createPost(@Body() post: Prisma.PostCreateInput) {
    for (let i: number = 1; i++; i < 1000000000000000000000) {}
    return null;
    // return this.postsService.createPost(post);
    // return 'you invoked the createPost';
  }
}
