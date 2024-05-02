import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { Types } from 'mongoose';
import { NotificationDocument } from './notification.schema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get("all")
  findAllAdmin() {
    return this.notificationsService.adminGet();
  }


  @Get()
  @HasRoles(Role.USER)
  findAll(@Req() req) {
    return this.notificationsService.findAll(req.user.sub);
  }
  @Get("push")
  pushNotification(createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.pushNotificationInTopic(createNotificationDto, "all");
  }

  @Get(':id')
  async trigger(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {

    let notification: NotificationDocument = await this.notificationsService.findOne(id);
    if (!notification) return "Notification not found"
    return this.notificationsService.pushNotificationInTopic(notification, "all");
  }

  @Patch(':id')
  @HasRoles(Role.USER)
  update(@Req() req, @Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.notificationsService.update(id, new Types.ObjectId(req.user.sub));
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.notificationsService.remove(id);
  }
}
