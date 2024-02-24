import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './entities/video.entity';
import { Model } from 'mongoose';

@Injectable()
export class VideosService {

  constructor(
    // Inject the video model
    // @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
    @InjectModel(Video.name) private videoModel: Model<Video>,


  ) {}

  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  findAll() {

    
    return this.videoModel.find();

  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
