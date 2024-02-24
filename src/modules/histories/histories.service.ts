import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HistoriesService {

  constructor(

      @InjectModel(History.name) private historyModel:Model<History>,
  ){}
  create(createHistoryDto: CreateHistoryDto) {
    return 'This action adds a new history';
  }

  findAll() {
    return this.historyModel.find();
  }

  findOne(id: number) {
    return this.historyModel.findById(id);
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return this.historyModel.findByIdAndUpdate(id, updateHistoryDto, { new: true });
  }

  remove(id: number) {
    return this.historyModel.findByIdAndDelete(id);
  }
}
