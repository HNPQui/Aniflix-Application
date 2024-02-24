import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Likes } from 'src/schemas/likes.schemas';
import { Model } from 'mongoose';

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

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
