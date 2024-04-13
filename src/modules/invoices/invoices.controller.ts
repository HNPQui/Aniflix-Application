import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { QueryInvoiceDto } from './dto/query-invoice.dto';
import { IsDate } from 'class-validator';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  @Post()
  create(@Body() createInvoiceDto: any) {
    const dto: CreateInvoiceDto = {
      ...createInvoiceDto.data
    }

    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll(@Query() query: QueryInvoiceDto) {
    return this.invoicesService.findAll(query);
  }

  @Get()
  statisticsByTime(@Query() query: {
    timeFrom: Date,
    timeTo: Date
  }) {
    return this.invoicesService.statisticsByTime(query.timeFrom, query.timeTo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }
}
