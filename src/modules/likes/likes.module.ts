import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikesSchema } from 'src/schemas/like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikesSchema },
    ]), // Add this line
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule { }
