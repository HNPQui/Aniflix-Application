import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like } from './entities/like.entity';
import { Likes } from 'src/schemas/likes.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name:Likes.name, schema:LikesModule},
    ]), // Add this line
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
