import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from '../invoices/invoice.shema';
import { Model } from 'mongoose';
import { Genre } from '../genres/genre.schema';
import { Movie } from '../movies/movie.schema';

@Injectable()
export class StatisticsService {

  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    @InjectModel(Genre.name) private genreModel: Model<Genre>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) { }

  statisticsMovie() {
    return this.movieModel.countDocuments().exec();

  }
  statisticsGenre() {
    return this.genreModel.countDocuments().exec();
  }

  async statisticsInvoice() {
    const total = await this.invoiceModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$dateTime",
              format: "%d-%m-%Y",
              timezone: "GMT",
            },
          },
          amount: { $sum: "$amount" },
        }
      },
      {
        $addFields: {
          dateTime: "$_id",
          timestamp: {
            $toLong: {
              $dateFromString: {
                dateString: "$_id"
              }
            }
          }
        }
      },
      {
        $limit: 10
      },
      {
        $sort: {
          timestamp: -1
        }
      },
      {
        $project: {
          _id: 0,
          timestamp: 0
        }
      }
    ]).exec();

    const totalPaid = await this.invoiceModel.aggregate([
      {
        $match: {
          status: 'PAID'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      },
      {
        $project: {
          _id: 0,
          total: 1
        }
      }
    ]);

    return {
      total,
      totalPaid: totalPaid[0]?.total || 0
    }
  }
}
