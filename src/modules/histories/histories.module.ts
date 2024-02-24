import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  imports: [
    // Import the MongooseModule to use the schema for the histories collection
    MongooseModule.forFeature([
      {name: History.name, schema:HistoriesModule},
    ]), // Add this line
  ],
  controllers: [HistoriesController],
  providers: [HistoriesService],
})
export class HistoriesModule {}
