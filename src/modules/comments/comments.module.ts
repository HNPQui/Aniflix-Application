import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Import the MongooseModule to use the schema for the comments collection
    MongooseModule.forFeature([
      {name: Comment.name, schema:CommentsModule},
    ]), // Add this line

  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
