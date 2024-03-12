import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Types } from 'mongoose';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    
    return this.ratingService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseMongoIdPipe) id: Types.ObjectId) {
    return this.ratingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: Types.ObjectId, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.ratingService.remove(id);
  }
}
