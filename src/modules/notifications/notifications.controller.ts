import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { Types } from 'mongoose';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @HasRoles(Role.USER)
  findAll(@Req() req) {
    return this.notificationsService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return "This action returns a #${id} notification"
  }

  @Patch(':id')
  @HasRoles(Role.USER)
  update(@Req() req, @Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.notificationsService.update(id, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.notificationsService.remove(id);
  }
}
