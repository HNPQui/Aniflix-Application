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
    return this.bucketCommentModel.findOneAndUpdate({
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
      { upsert: true });
  }

  findAll(videoId: Types.ObjectId, page: number = 1, limit: number = 1) {
    return this.bucketCommentModel.find({
      videoId
    }).sort({ updatedAt: -1 }) // sắp xếp theo thời gian tạo mới nhất
      .skip((page - 1) * limit) //skip the first n items
      .limit(limit) //limit the number of items returned
      // chỉ lấy những document ko có deletedAt hoặc deletedAt = null trong field `comments`
      .select({
        comments: {
          $elemMatch: {
            deletedAt: { $exists: false }
          }
        }
      }).lean();;
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
