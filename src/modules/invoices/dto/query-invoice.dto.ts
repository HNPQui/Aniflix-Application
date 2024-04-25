import { Optional } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsIn, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class QueryInvoiceDto {
    @IsOptional()
    @IsIn(['PAID', 'MEMBER_NOT_FOUND'], { message: 'status must be either PAID or MEMBER_NOT_FOUND' })
    status?: string;


    @IsOptional()
    timeFrom?: Date;

    @IsOptional()
    timeTo?: Date;

    @IsOptional()
    username?: string;
}
