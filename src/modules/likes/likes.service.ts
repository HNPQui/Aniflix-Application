import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from 'src/schemas/like.schema';
import { Model, Types, ObjectId } from 'mongoose';
import { Video } from 'src/schemas/video.schema';

@Injectable()
export class LikesService {

  constructor(
    @InjectModel(Like.name) private likeModel: Model<Like>,
  ) { }
  create(createLikeDto: CreateLikeDto) {

    return this.likeModel.findOneAndUpdate({ video: createLikeDto.videoId },
    {
      $pull: { children: createLikeDto.userId }, // Remove child from array if it exists
      $addToSet: { children: createLikeDto.userId } // Add child to array if it doesn't exist
    },
    { upsert: true });
  }

  //top 10 video most like
  async getTop10MostLike() {
    const query = this.likeModel.aggregate([
      {
        $addFields: {
          likeCount: {
            $size: "$users"
          }
        }
      },
      {
        $sort: {
          likeCount: -1
        }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: "videos",
          pipeline: [
            {
              $lookup: {
                from: "categories",
                localField: "categories",
                foreignField: "_id",
                as: "category"
              }
            }, {
              $unwind: "$category"
            }, {
              $project: {
                categories: 0,
                _id: 0
              }
            }
          ],
          localField: "video",
          foreignField: "_id",
          as: "video"
        }
      },
      {
        $unwind: "$video"
      },
      {
        $project: {
          users: 0
        }
      }
    ])
    const result = await query.exec();
    return result;
  }

  findAll(userId: Types.ObjectId | string) {
    return this.likeModel.find({ user: userId }).limit(10).exec();
  }

  async findOne(videoId: Types.ObjectId, userId: Types.ObjectId) {
    const query = this.likeModel.aggregate([
      {
        $match: {
          _id: videoId
        }
      },
      {
        $addFields: {
          isLiked: {
            $in: [userId, "$users"]
          },
          likesCount: {
            $size: "$users"
          }
        }
      },
      {
        $project: {
          users: 0,
          _id: 0,
          video: 0
        }
      }
    ])
    const result = await query.exec();
    return result[0] || [];
  }

  update(id: Types.ObjectId, updateLikeDto: UpdateLikeDto) {
    return this.likeModel.findByIdAndUpdate(id, updateLikeDto, { new: true })
  }

  remove(id: Types.ObjectId) {
    return this.likeModel.findByIdAndDelete(id);
  }
}
