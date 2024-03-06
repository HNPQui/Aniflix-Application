import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from 'src/schemas/video.schema';

@Module({

  imports: [
    // Import the MongooseModule to use the schema for the videos collection
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
    ])

  ],

  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule { }
