import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ObjectId, Types } from 'mongoose';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';

@Controller('videos')
export class VideosController {

  constructor(private readonly videosService: VideosService) { }
  
  // @HasRoles(Role.USER)
  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get('search')
  search(@Request() req) {
    return this.videosService.search(req.query.q);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.videosService.findOne(id);
  }
  // @HasRoles(Role.USER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: Types.ObjectId, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }
  // @HasRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.videosService.remove(id);
  }
}
