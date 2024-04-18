import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from './genre.schema';
import { Model, Types } from 'mongoose';

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
        $match: {
          isDeleted: false
        }
      },
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
        $sort: {
          count: -1
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

  async update(id: Types.ObjectId, updateGenreDto: UpdateGenreDto) {
    await this.genreModel.findByIdAndUpdate(id, {
      name: updateGenreDto.name
    }).exec();
    const result = await this.genreModel.aggregate([
      {
        $match: {
          _id: id
        }
      },
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
    ]).exec();
    return result[0] || {}
  }

  remove(id: Types.ObjectId) {
    return this.genreModel.findByIdAndUpdate(id, {
      isDeleted: true,
      name: ""
    });
  }
}
