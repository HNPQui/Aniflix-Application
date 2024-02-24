import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories } from 'src/schemas/categories.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Categories.name, schema:CategoriesModule},
    ]), // Add this line
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
