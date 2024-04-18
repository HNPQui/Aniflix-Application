import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterQuery, Model, ProjectionType, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find().sort({ createdAt: -1 });
  }

  claim(userId: Types.ObjectId, point) {
    return this.userModel.findByIdAndUpdate(userId, {
      point: point
    })
  }

  findOne(query: FilterQuery<User>, projection?: ProjectionType<User>) {
    return this.userModel.findOne(query, projection || { password: 0 });
  }

  

  fcm(id: Types.ObjectId, device_token: string) {
    return this.userModel.findByIdAndUpdate(id, {
      $addToSet: {
        fcm_token: device_token
      }
    }, {
      new: true,
      lean: true
    })
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
