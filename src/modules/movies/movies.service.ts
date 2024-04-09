import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import { Model } from 'mongoose';
import { QuerySearchVideoDto } from '../videos/dto/search-video.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) { }

  create(createMovieDto: CreateMovieDto) {
    return 'This action adds a new movie';
  }

  search(dto: QuerySearchVideoDto) {
    return this.movieModel.find({ title: { $regex: dto.keyword, $options: 'i' } });
  }

  findAll() {
    return this.movieModel.find().populate('genres');
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
