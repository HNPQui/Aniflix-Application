import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from '../movies/movie.schema';
import { Genre, GenreSchema } from '../genres/genre.schema';
import { Invoice, InvoiceSchema } from '../invoices/invoice.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      }, {
        name: Genre.name,
        schema: GenreSchema,
      }, {
        name: Invoice.name,
        schema: InvoiceSchema,
      }
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule { }
