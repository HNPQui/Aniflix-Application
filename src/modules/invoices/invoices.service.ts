import { HttpException, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './invoice.shema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, timestamp } from 'rxjs';
import { Model } from 'mongoose';

@Injectable()
export class InvoicesService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    private readonly httpService: HttpService
  ) { }

  async create(data: CreateInvoiceDto) {

    console.log("CreateInvoiceDto", data)
    let split = data.description?.split(' ');
    if (!split || split.length < 2) {
      throw new HttpException('Nội dung chuyển khoản không hợp lệ', 400);
    }
    const username = split[1];
    const user: UserDocument = await this.userModel.findOneAndUpdate({ username }, {
      isPremium: true,
      name: {
        $concat: ["$name", "👑"]
      }
    }).exec();

    await this.invoiceModel.create({
      ...data,
      dateTime: new Date(data.transactionDateTime),
      user: user?._id,
      status: user ? 'PAID' : 'MEMBER_NOT_FOUND'
    });


    return {
      success: true
    }
  }

  async check(id: string) {
    const rq = this.httpService.get(`https://api-merchant.payos.vn/v2/payment-requests/${id}`, {
      headers: {
        'x-client-id': '4ea46f72-05a0-43a3-b88c-85e79bb16fe5',
        'x-api-key': '7b09459f-d371-427c-a673-50442c1f421a'
      }
    });
    const res = await firstValueFrom(rq);
    console.log("check", id, "=", res.data);
    const { status, orderCode } = res.data?.data || {};
    if (!status || !orderCode) {
      return 'NOT_FOUND';
    }
    if (status === 'PAID') {
      const invoice = await this.invoiceModel.findOne({ orderCode }).exec();
      if (invoice) {
        return invoice.status;
      }
    }
    return status;
  }

  //thông kê doanh thu theo thời gian hôm nay, tuần này, tháng này


  findAll() {
    return this.invoiceModel.find().populate({
      path: 'user',
      select: 'username name'
    }).sort({
      dateTime: -1
    }).lean();
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
