import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { Video } from './entities/video.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosSchema } from 'src/schemas/videos.schema';

@Module({

  imports: [
    // Import the MongooseModule to use the schema for the videos collection
    MongooseModule.forFeature([
      {name: Video.name, schema:VideosSchema},
    ]), // Add this line

  ],

  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
