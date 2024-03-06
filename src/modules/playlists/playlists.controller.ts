import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ObjectId } from 'mongoose';
import { ValidateMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}
  @HasRoles(Role.USER)
  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto);
  }
  
  @Get()
  findAll() {
    return this.playlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ValidateMongoIdPipe) id: ObjectId) {
    return this.playlistsService.findOne(id);
  }
  @HasRoles(Role.USER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistsService.update(id, updatePlaylistDto);
  }
  @HasRoles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.playlistsService.remove(id);
  }
}
