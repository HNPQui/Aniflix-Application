import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { ObjectId } from 'mongoose';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

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
  findOne(@Param('id') id: ObjectId) {
    return this.historiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historiesService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.historiesService.remove(id);
  }
}
