import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlists } from 'src/schemas/playlists.schemas';

@Module({
  imports: [
    // Import the MongooseModule to use the schema for the playlists collection
     MongooseModule.forFeature([
       {name: Playlists.name, schema:PlaylistsModule},
     ]), // Add this line
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
