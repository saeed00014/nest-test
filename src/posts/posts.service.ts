import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  createPost(post: Prisma.PostCreateInput) {
    return this.databaseService.post.create({ data: post });
  }
}
