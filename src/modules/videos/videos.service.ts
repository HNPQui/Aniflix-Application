import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './entities/video.entity';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class VideosService {

  constructor(
    // Inject the video model
    // @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
    @InjectModel(Video.name) private videoModel: Model<Video>,


  ) { }

  create(createVideoDto: CreateVideoDto) {
    return this.videoModel.create(createVideoDto);
  }

  findAll() {
    return this.videoModel.find();
  }
  findOne(id: ObjectId) {

    return this.videoModel.findById(id);
  }

  update(id: ObjectId, updateVideoDto: UpdateVideoDto) {
    return this.videoModel.findByIdAndUpdate(id, updateVideoDto, { new: true });
  }

  remove(id: ObjectId) {
    return this.videoModel.findByIdAndDelete(id);
  }
}
