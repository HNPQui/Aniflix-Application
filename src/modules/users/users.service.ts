import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterQuery, Model, ProjectionType, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class UsersService {
  async statistics() {
    const day = 24 * 60 * 60 * 1000;
    const week = 7 * 24 * 60 * 60 * 1000;
    let list = await this.userModel.aggregate([
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getTime() - week)
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$createdAt",
              format: "%d-%m-%Y",
              timezone: "GMT",
            },
          },
          count: { $sum: 1 }
        }
      }, {
        $addFields: {
          date: "$_id"
        }
      }, {
        $limit: 7
      }, {
        $project: {
          _id: 0
        }
      }
    ]).exec();

    let newList = []
    for (let i = 0; i < 7; i++) {
      let curDate = new Date().setHours(0, 0, 0, 0) - (day * i)
      let dateNow = new Date(curDate).toLocaleDateString("es-CL");
      let available = list.find(x => x.date == dateNow);
      let data = {
        date: this.parseDate(available?.date || dateNow) == new Date(curDate) ? available?.date : dateNow,
        count: available?.count || 0
      }
      newList.push(data)
    }

    const total = await this.userModel.countDocuments();
    return {
      list: newList,
      total
    }
  }

  parseDate(dateString) {
    // Split the date string into day, month, and year components
    const [day, month, year] = dateString.split('-').map(Number);

    // Create a new Date object
    // Note: Months in JavaScript Date objects are zero-based, so we need to subtract 1 from the month
    return new Date(year, month - 1, day);
  }

  becomeVip(sub: any) {
    return this.userModel.findByIdAndUpdate(sub, {
      isPremium: true,
    }, {
      new: true
    }).select({
      password: 0,
      fcm_token: 0,
      role: 0
    }).lean();
  }

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private notificationsService: NotificationsService
  ) { }
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find().sort({ createdAt: -1 });
  }

  ban(id: Types.ObjectId) {
    return this.userModel.findByIdAndUpdate(id, {
      status: {
        $not: true
      }
    })
  }

  claim(userId: Types.ObjectId, point) {
    return this.userModel.findByIdAndUpdate(userId, {
      point: point
    })
  }

  findOne(query: FilterQuery<User>, projection?: ProjectionType<User>) {
    return this.userModel.findOne(query, projection || { password: 0 });
  }

  async fcm(id: Types.ObjectId, device_token: string) {
    const { fcm_token } = await this.userModel.findByIdAndUpdate(id, {
      $addToSet: {
        fcm_token: device_token
      }
    }).exec();
    if (!fcm_token.includes(device_token)) {
      this.notificationsService.subscribe([device_token]);
    }
    return true
  }

  findById(id: Types.ObjectId) {
    return this.userModel.findById(id);
  }
  findUsername(query: FilterQuery<User>) {
    return this.userModel.findOne(query);
  }

  update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).select({ password: 0 });
  }

  remove(id: Types.ObjectId) {
    return this.userModel.findByIdAndDelete(id);
  }
}
