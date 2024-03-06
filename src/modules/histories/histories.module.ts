import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from 'src/schemas/history.schema';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: History.name, schema: HistorySchema },
    ])
  ],
  controllers: [HistoriesController],
  providers: [HistoriesService],
})
export class HistoriesModule { }
