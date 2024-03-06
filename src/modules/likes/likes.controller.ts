import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Role } from 'src/enums/role.enum';
import { HasRoles } from 'src/decorators/role.decorator';
import { Types } from 'mongoose';
import { ValidateMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @HasRoles(Role.USER)
  @Post()
  @HasRoles(Role.USER)
  create(@Request() req, @Body() createLikeDto: CreateLikeDto) {
    console.log(req.user)
    createLikeDto.userId = req.user.sub;
    return this.likesService.create(createLikeDto);
  }

  @Get("top")
  getTop10MostLike() {
    return this.likesService.getTop10MostLike();
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
 @HasRoles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.likesService.remove(id);
  }
}
