import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './notification.schema';
import { FcmService } from '../nestjs-fcm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    private fcmService: FcmService
  ) { }

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationModel.create(createNotificationDto);
  }

  subscribe(deviceIds: Array<string>) {
    this.fcmService.subscribeToTopic(deviceIds, "all");
  }

  findAll(id: Types.ObjectId) {
    return this.notificationModel.aggregate([
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $limit: 10
      },
      {
        $addFields: {
          isRead: {
            $in: [id, "$users"]
          }
        }
      }, {
        $project: {
          users: 0
        }
      }
    ])
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: Types.ObjectId, userId: Types.ObjectId) {
    return this.notificationModel.findOneAndUpdate({
      _id: userId
    }, {
      $addToSet: {
        users: id
      }
    })
  }

  remove(id: Types.ObjectId) {
    return this.notificationModel.findByIdAndDelete(id);
  }
}
