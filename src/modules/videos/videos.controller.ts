import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ObjectId } from 'mongoose';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ValidateMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }
  @HasRoles(Role.USER)
  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateMongoIdPipe) id: ObjectId) {
    return this.videosService.findOne(id);
  }
  @HasRoles(Role.USER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }
  @HasRoles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.videosService.remove(id);
  }
}
