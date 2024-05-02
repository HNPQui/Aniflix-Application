import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) { }

  @Get("invoice")
  invoice() {
    return this.statisticsService.statisticsInvoice();
  }

  @Get("genre")
  genre() {
    return this.statisticsService.statisticsGenre();
  }

  @Get("movie")
  movie() {
    return this.statisticsService.statisticsMovie();
  }


}
