import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Role } from 'src/enums/role.enum';
import { HasRoles } from 'src/decorators/role.decorator';
import { Types } from 'mongoose';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @HasRoles(Role.USER)
  @Post()
  create(@Request() req, @Body() createLikeDto: CreateLikeDto) {
    createLikeDto.userId = new Types.ObjectId(req.user.sub);
    return this.likesService.create(createLikeDto);
  }

  @HasRoles(Role.USER)
  @Delete(':id')
  remove(@Request() req, @Param('id', ParseMongoIdPipe) videoId: Types.ObjectId) {
    const dto: CreateLikeDto = {
      userId: new Types.ObjectId(req.user.sub),
      videoId: videoId
    }
    return this.likesService.remove(dto);
  }


  @Get("top")
  getTop10MostLike() {
    return this.likesService.getTop10MostLike();
  }

  @HasRoles(Role.USER)
  @Get("info/:id")
  getInfo(@Request() req, @Param('id', ParseMongoIdPipe) videoId: Types.ObjectId) {
    const userId = new Types.ObjectId(req.user.sub);
    return this.likesService.findOne(videoId, userId);
  }

  @HasRoles(Role.USER)
  @Get()
  findAll(@Request() req) {
    console.log(req.user);
    return this.likesService.findAll(req.user['sub']);
  }
  @HasRoles(Role.USER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: Types.ObjectId, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(id, updateLikeDto);
  }

}
