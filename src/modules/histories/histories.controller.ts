import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { ObjectId } from 'mongoose';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}
  @HasRoles(Role.USER)
  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.create(createHistoryDto);
  }
  
  @HasRoles(Role.USER)
  @Get()
  findAll(@Request() req) {
    return this.historiesService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id',ParseMongoIdPipe) id: ObjectId) {
    return this.historiesService.findOne(id);
  }
  @HasRoles(Role.USER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historiesService.update(id, updateHistoryDto);
  }
  @HasRoles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.historiesService.remove(id);
  }
}
