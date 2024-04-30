import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
