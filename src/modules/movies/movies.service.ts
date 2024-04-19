import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { QuerySearchVideoDto } from '../videos/dto/search-video.dto';

@Injectable()
export class MoviesService {

  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) { }

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  findTop(query: QuerySearchVideoDto) {
    const filterQuery: FilterQuery<Movie> = {};
    const limit = query.limit || 10;
    const page = query.page || 1;
    if (query.type) {
      filterQuery.type = query.type;
    }
    console.log("findTop", query, filterQuery);
    return this.movieModel.find(filterQuery)
      .sort({ [query.filter]: -1 })
      .skip((page - 1) * limit).limit(limit).lean();

  }

  search(dto: QuerySearchVideoDto) {
    return this.movieModel.find({ title: { $regex: dto.keyword, $options: 'i' } });
  }

  findAll() {
    return this.movieModel.find().populate('genres');
  }

  findOne(id: Types.ObjectId) {
    return this.movieModel.findById(id).populate('genres');
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
