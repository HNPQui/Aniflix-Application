import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Types } from 'mongoose';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }
  // @HasRoles(Role.USER)
  @Post()
  create(@Req() req, @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.userId = req.user.sub;
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(
    @Query('videoId', ParseMongoIdPipe) videoId: Types.ObjectId,
    @Query('page', ParseIntPipe) page: number = 1
  ) {
    return this.commentsService.findAll(videoId, page, 1);
  }

  // @Get(':id')
  // findOne(@Param('id', ParseMongoIdPipe) id: string) {
  //   return this.commentsService.findOne(id);
  // }
  // @HasRoles(Role.USER)
  @Patch(':id')
  update(@Req() req, @Body() updateCommentDto: UpdateCommentDto) {
    updateCommentDto.userId = req.user?.sub || new Types.ObjectId("65e93261055ce5a463990cbc"); // FAKE
    return this.commentsService.update(updateCommentDto);
  }
  // @HasRoles(Role.USER)
  @Delete(':id')
  remove(@Req() req, @Param('id', ParseMongoIdPipe) commentId: Types.ObjectId) {
    const userId = req.user?.sub || new Types.ObjectId("65e93261055ce5a463990cbc"); // FAKE
    return this.commentsService.remove(userId, commentId);
  }
}
