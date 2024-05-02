import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema, Notification } from './notification.schema';
import { FcmModule } from '../nestjs-fcm';
import { TasksService } from '../tasks/tasks.service';

@Module({
  imports: [
    FcmModule.forRoot({
      firebaseSpecsPath: 'src/secrets/firebase-adminsdk.json',
    }),
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema
      }
    ])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, TasksService],
  exports: [NotificationsService]
})
export class NotificationsModule { }
