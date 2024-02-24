import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Playlists } from 'src/schemas/playlists.schemas';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class PlaylistsService {

  constructor(
      @InjectModel(Playlists.name) private playlistModel:Model<Playlists>,

  ){}
  create(createPlaylistDto: CreatePlaylistDto) {
    return 'This action adds a new playlist';
  }

  findAll() {
    return this.playlistModel.find();
  }

  findOne(id: ObjectId) {
    return this.playlistModel.findById(id);
  }

  update(id: ObjectId, updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistModel.findByIdAndUpdate(id, updatePlaylistDto, { new: true });
  }

  remove(id: ObjectId) {
    return this.playlistModel.findByIdAndDelete(id);
  }
}
