import { Module } from '@nestjs/common';
import { PlaylistsVideosService } from './playlists_videos.service';
import { PlaylistsVideosController } from './playlists_videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlists_videos, Playlists_videosSchema } from 'src/schemas/playlists_videos.schemas copy';

@Module({
  imports: [
    // Import the MongooseModule to use the schema for the playlists_videos collection
   MongooseModule.forFeature([
      {name: Playlists_videos.name, schema:Playlists_videosSchema},
    ]), // Add this line
  ],
  controllers: [PlaylistsVideosController],
  providers: [PlaylistsVideosService],
})
export class PlaylistsVideosModule {}
