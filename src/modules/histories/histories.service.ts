import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { History } from 'src/schemas/history.schema';

@Injectable()
export class HistoriesService {

  constructor(
      @InjectModel(History.name) private historyModel:Model<History>,
  ){}
  create(createHistoryDto: CreateHistoryDto) {
    return 'This action adds a new history';
  }

  findAll(userId : Types.ObjectId | string) {
    return this.historyModel.find({ user : userId }).exec();
  }

  findOne(id: Types.ObjectId) {
    return this.historyModel.findById(id);
  }

  update(id: Types.ObjectId, updateHistoryDto: UpdateHistoryDto) {
    return this.historyModel.findByIdAndUpdate(id, updateHistoryDto, { new: true });
  }

  remove(id: Types.ObjectId) {
    return this.historyModel.findByIdAndDelete(id);
  }
}
