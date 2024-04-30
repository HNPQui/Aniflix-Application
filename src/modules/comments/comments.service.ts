import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from 'src/schemas/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BucketComment } from 'src/schemas/bucket-comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(BucketComment.name) private bucketCommentModel: Model<BucketComment>
  ) { }

  create(dto: CreateCommentDto) {
    const comment = new this.commentModel(dto);
    this.bucketCommentModel.findOneAndUpdate({
      videoId: dto.videoId,
      count: { $lt: 5 }
    },
      {
        $push: {
          comments: comment
        },
        $inc: {
          count: 1
        },
        $setOnInsert: {
          videoId: dto.videoId
        }
      },
      { upsert: true }).exec();
    return true
  }

  async findAll(videoId: Types.ObjectId) {
    const projection = {
      comments: {
        $filter: {
          input: "$comments",
          cond: {
            $not: ["$$this.deletedAt"]
          }
        }
      }
    }
    const doc = await this.bucketCommentModel.find({
      videoId,
    }, projection).sort({ updatedAt: -1 }) // sắp xếp theo thời gian tạo mới nhất
      .populate("comments.userId", "name picture -_id") //populate the userId field with the username and avatar fields of the user
      .lean().exec();
    const list = [];
    for (const comment of doc) {
      for (const item of comment.comments) {
        list.push(item);
      }
    }
    return list;
  }

  findOne(id: string) {
    return this.commentModel.findById(id);
  }

  async update(dto: UpdateCommentDto) {
    const result = await this.bucketCommentModel.findOneAndUpdate(
      {
        comments: {
          $elemMatch: {
            _id: dto.commentId,
            userId: dto.userId
          }
        }
      }, {
      $set: {
        "comments.$.content": dto.content
      }
    })
      .select("_id")
      .lean()
      .exec();
    return result ?? false
  }

  async remove(userId: Types.ObjectId, commentId: Types.ObjectId) {
    const options = {
      // zzzz (identifier) là tên biến mà chúng ta sẽ sử dụng trong arrayFilters
      arrayFilters: [{ "zzzz._id": commentId }]
    };
    const result = await this.bucketCommentModel.findOneAndUpdate(
      {
        comments: {
          $elemMatch: {
            _id: commentId,
            userId
          }
        }
      }, {
      $set: {
        //$ - chọn phần tử mảng đầu tiên mà đáp ứng điều kiện
        //$[] - chọn tất cả phần tử mảng mà đáp ứng điều kiện
        //$[<identifier>] - chọn phần tử mảng mà đáp ứng điều kiện
        "comments.$.content": "This comment has been removed"
      }
    })
      .select("_id")
      .lean() //chuyển kết quả từ kiểu Mongoose Document sang kiểu object
      .exec();
    return result ?? false
  }
}
