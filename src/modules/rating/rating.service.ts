import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Model, Types } from 'mongoose';
import { Rating } from 'src/schemas/rating.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RatingService {

  constructor(
    @InjectModel(Rating.name) private rateModel: Model<Rating>,
  ) { }
  create(createRatingDto: CreateRatingDto) {
    return this.rateModel.create(createRatingDto);
  }

  findAll() {
    return this.rateModel.find();
  }

  findOne(id: Types.ObjectId) {
    return this.rateModel.findById(id);
  }

  update(id: Types.ObjectId, updateRatingDto: UpdateRatingDto) {
    return this.rateModel.findByIdAndUpdate(id);
  }

  remove(id: Types.ObjectId) {
    return this.rateModel.findByIdAndDelete(id);
  }
}
