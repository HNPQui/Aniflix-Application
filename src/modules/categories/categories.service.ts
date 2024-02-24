import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from 'src/schemas/categories.schemas';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Categories.name) private categoryModel: Model<Categories>,

  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return this.categoryModel.find();
  }

  findOne(id: number) {
    return this.categoryModel.findById(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
  }

  remove(id: number) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
