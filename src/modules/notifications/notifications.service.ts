import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './notification.schema';
import { FcmService } from '../nestjs-fcm';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    private fcmService: FcmService,
    private tasksService: TasksService
  ) { }

  async create(createNotificationDto: CreateNotificationDto) {
    let notification: NotificationDocument = await new this.notificationModel(createNotificationDto).save();

    if (notification?.schedule) {
      this.tasksService.addCronJob(notification._id.toString(), new Date(notification.schedule), async () => {
        let result = await this.pushNotificationToAll(notification);
        console.log("scheduled notification", result)
      });
    } else {
      let result = await this.pushNotificationToAll(notification);
      console.log("notification", result)
    }
    return true;
  }

  subscribe(deviceIds: Array<string>) {
    this.fcmService.subscribeToTopic(deviceIds, "all");
  }

  pushNotification({ title, content }: CreateNotificationDto | Notification, deviceIds: Array<string>) {
    return this.fcmService.sendNotification({
      notification: {
        title: title,
        body: content
      }
    }, false, "", deviceIds);
  }

  pushNotificationToAll(dto: CreateNotificationDto | Notification) {
    return this.pushNotificationInTopic(dto, "all")
  }

  pushNotificationInTopic({ title, content }: CreateNotificationDto | Notification, topic: string) {
    return this.fcmService.sendNotification({
      notification: {
        title: title,
        body: content
      }
    }, false, topic);
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

  findOne(id: Types.ObjectId) {
    return this.notificationModel.findById(id);
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
