import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Video } from 'src/schemas/video.schema';

@Injectable()
export class VideosService {

  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
  ) { }

  create(createVideoDto: CreateVideoDto) {
    return this.videoModel.create(createVideoDto);
  }

  findAll() {
    return this.videoModel.find().limit(3).populate("categories");
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
