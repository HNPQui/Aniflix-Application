import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Types } from 'mongoose';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseMongoIdPipe) id: Types.ObjectId) {
    return this.categoriesService.findOne(id);
  }
  @HasRoles(Role.USER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: Types.ObjectId, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }
  @HasRoles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.categoriesService.remove(id);
  }
}
