import { Injectable } from '@nestjs/common';
import { Model, Types, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
const ffmpeg = require('fluent-ffmpeg');
import * as fs from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from '../movies/movie.schema';

@Injectable()
export class UploadVideoService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) { }
  updateEpisodes(videoId: Types.ObjectId, fileName: string, episodes: number) {
    var updateQuery = {};
    updateQuery["list." + episodes] = fileName;
    return this.movieModel.updateOne({ _id: videoId }, {
      $set: updateQuery
    });
  }
}
