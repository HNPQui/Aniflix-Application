import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from 'src/schemas/comment.schema';
import { BucketComment, BucketCommentSchema } from 'src/schemas/bucket-comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: BucketComment.name, schema: BucketCommentSchema }
    ])
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
