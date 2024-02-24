import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Likes } from 'src/schemas/likes.schemas';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class LikesService {

  constructor(

    @InjectModel(Likes.name) private likeModel: Model<Likes>,
  ){}
  create(createLikeDto: CreateLikeDto) {
    return 'This action adds a new like';
  }

  findAll() {
    return this.likeModel.find();
  }

  findOne(id: ObjectId) {
    return this.likeModel.findById(id);
  }

  update(id: ObjectId, updateLikeDto: UpdateLikeDto) {
    return this.likeModel.findByIdAndUpdate(id, updateLikeDto, { new: true })
  }

  remove(id: ObjectId) {
    return this.likeModel.findByIdAndDelete(id);
  }
}
