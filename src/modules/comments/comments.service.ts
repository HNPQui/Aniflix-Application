import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {

    constructor(
      @InjectModel(Comment.name) private commentModel: Model<Comment>,
    ){}

  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return this.commentModel.find();
  }

  findOne(id: number) {
    return this.commentModel.findById(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true });
  }

  remove(id: number) {
    return this.commentModel.findByIdAndDelete(id);
  }
}
