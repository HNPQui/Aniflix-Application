import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterQuery, Model, Types } from 'mongoose';
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
    return this.userModel.find();
  }

  claim(userId: Types.ObjectId) {
    return this.userModel.findByIdAndUpdate(userId, {
      $inc: { point: 10 }
    })
  }

  findOne(query: FilterQuery<User>) {
    return this.userModel.findOne(query, { password: 0 });
  }

  findById(id: Types.ObjectId) {
    return this.userModel.findById(id);
  }
  findUsername(query: FilterQuery<User>) {
    return this.userModel.findOne(query);
  }

  update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: Types.ObjectId) {
    return this.userModel.findByIdAndDelete(id);
  }
}
