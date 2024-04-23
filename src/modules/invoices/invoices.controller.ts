import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { QueryInvoiceDto } from './dto/query-invoice.dto';
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  @Post()
  @HttpCode(200)
  create(@Body() createInvoiceDto: any) {
    const dto: CreateInvoiceDto = {
      ...createInvoiceDto.data
    }
    return this.invoicesService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryInvoiceDto) {
    return this.invoicesService.findAll(query);
  }

  @Get('check/:id')
  check(@Param('id') id: string) {
    return this.invoicesService.check(id);
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
