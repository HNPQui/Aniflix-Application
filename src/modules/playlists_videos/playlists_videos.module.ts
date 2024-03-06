import { Module } from '@nestjs/common';
import { PlaylistsVideosService } from './playlists_videos.service';
import { PlaylistsVideosController } from './playlists_videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistVideos, PlaylistVideosSchema } from 'src/schemas/playlist-video.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlaylistVideos.name, schema: PlaylistVideosSchema },
    ])
  ],
  controllers: [PlaylistsVideosController],
  providers: [PlaylistsVideosService],
})
export class PlaylistsVideosModule { }
