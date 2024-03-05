import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ObjectId } from 'mongoose';
import { ValidateMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @HasRoles(Role.USER)
  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ValidateMongoIdPipe) id: ObjectId) {
    return this.likesService.findOne(id);
  }
  @HasRoles(Role.USER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(id, updateLikeDto);
  }
 @HasRoles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.likesService.remove(id);
  }
}
