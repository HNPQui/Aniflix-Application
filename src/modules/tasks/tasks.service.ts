import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  constructor(
    private schedulerRegistry: SchedulerRegistry
  ) { }
  addCronJob(name: string, dateTime: Date, callback: () => void) {
    const job = new CronJob(dateTime, () => {
      console.log('executing task', name);
      callback();
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    console.warn(`job ${name} deleted!`);
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      console.log(`job: ${key} -> next: ${next}`);
    });
  }
}
