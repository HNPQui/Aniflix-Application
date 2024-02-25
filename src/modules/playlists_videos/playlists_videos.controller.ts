import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistsVideosService } from './playlists_videos.service';
import { CreatePlaylistsVideoDto } from './dto/create-playlists_video.dto';
import { UpdatePlaylistsVideoDto } from './dto/update-playlists_video.dto';
import { ObjectId } from 'mongoose';

@Controller('playlists-videos')
export class PlaylistsVideosController {
  constructor(private readonly playlistsVideosService: PlaylistsVideosService) {}

  @Post()
  create(@Body() createPlaylistsVideoDto: CreatePlaylistsVideoDto) {
    return this.playlistsVideosService.create(createPlaylistsVideoDto);
  }

  @Get()
  findAll() {
    return this.playlistsVideosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.playlistsVideosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updatePlaylistsVideoDto: UpdatePlaylistsVideoDto) {
    return this.playlistsVideosService.update(id, updatePlaylistsVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.playlistsVideosService.remove(id);
  }
}
