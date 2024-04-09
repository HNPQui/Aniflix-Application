import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from './genre.schema';
import { Model } from 'mongoose';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<Genre>,
  ) { }
  create(createGenreDto: CreateGenreDto) {
    return 'This action adds a new genre';
  }

  findAll() {
    return this.genreModel.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "genres",
          as: "movies"
        }
      },
      {
        $addFields: {
          count: {
            $size: "$movies"
          }
        }
      },
      {
        $project: {
          movies: 0
        }
      }
    ]);
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
