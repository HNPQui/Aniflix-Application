import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/schemas/category.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,

  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.find().lean();
  }

  findOne(id: Types.ObjectId) {
    return this.categoryModel.findById(id).lean();
  }

  update(id: Types.ObjectId, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto).lean();
  }

  remove(id: Types.ObjectId) {
    return this.categoryModel.findByIdAndDelete(id).lean();
  }
}
