import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './invoice.shema';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { QueryInvoiceDto } from './dto/query-invoice.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>
  ) { }

  async create(data: CreateInvoiceDto) {
    const user: UserDocument = await this.userModel.findOne({ username: data.description }).exec();

    await this.invoiceModel.create({
      ...data,
      dateTime: new Date(data.dateTime),
      user: user?._id,
      status: user ? 'PAID' : 'MEMBER_NOT_FOUND'
    });


    return {
      success: true
    }
  }

  //thông kê doanh thu theo thời gian hôm nay, tuần này, tháng này
  async statisticsByTime(timeFrom: Date, timeTo: Date) {
    const total = await this.invoiceModel.aggregate([
      {
        $match: {
          dateTime: {
            $gte: timeFrom,
            $lte: timeTo
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      },
      {
        $unwind: '$total'
      }

    ]);

    const totalPaid = await this.invoiceModel.aggregate([
      {
        $match: {
          dateTime: {
            $gte: timeFrom,
            $lte: timeTo
          },
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
        $unwind: '$total'
      }
    ]);

    const totalMemberNotFound = await this.invoiceModel.aggregate([
      {
        $match: {
          dateTime: {
            $gte: timeFrom,
            $lte: timeTo
          },
          status: 'MEMBER_NOT_FOUND'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      },
      {
        $unwind: '$total'
      }
    ]);

    return {
      total,
      totalPaid,
      totalMemberNotFound
    }

    // return {
    //   total: total[0]?.total || 0,
    //   totalPaid: totalPaid[0]?.total || 0,
    //   totalMemberNotFound: totalMemberNotFound[0]?.total || 0
    // }
  }

  findAll(query: QueryInvoiceDto) {
    const filter: FilterQuery<Invoice> = {};
    if (query.status) {
      filter.status = query.status;
    }
    if (query.timeFrom && query.timeTo) {
      filter.dateTime = {
        $gte: query.timeFrom,
        $lte: query.timeTo
      }
    }

    if (query.username) {
      filter['user.username'] = query.username;
    }
    console.log("findAllInvoce", filter);
    return this.invoiceModel.find(query).populate('user');
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
