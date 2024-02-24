import { Injectable } from '@nestjs/common';
import { CreatePlaylistsVideoDto } from './dto/create-playlists_video.dto';
import { UpdatePlaylistsVideoDto } from './dto/update-playlists_video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Playlists_videos } from 'src/schemas/playlists_videos.schemas copy';
import { PlaylistsVideosModule } from './playlists_videos.module';
import { Model } from 'mongoose';

@Injectable()
export class PlaylistsVideosService {

  constructor(

    @InjectModel(Playlists_videos.name) private playlistsVideoModel: Model<Playlists_videos>,
  ){}
  create(createPlaylistsVideoDto: CreatePlaylistsVideoDto) {
    return 'This action adds a new playlistsVideo';
  }

  findAll() {
    return this.playlistsVideoModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} playlistsVideo`;
  }

  update(id: number, updatePlaylistsVideoDto: UpdatePlaylistsVideoDto) {
    return `This action updates a #${id} playlistsVideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlistsVideo`;
  }
}
