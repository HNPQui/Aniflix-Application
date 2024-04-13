import { Optional } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsIn, IsString } from "class-validator";
import { Types } from "mongoose";

export class QueryInvoiceDto {
    @Optional()
    @IsString()
    @IsIn(['PAID', 'MEMBER_NOT_FOUND'], { message: 'status must be either PAID or MEMBER_NOT_FOUND' })
    status?: string;


    @Optional()
    timeFrom?: Date;

    @Optional()
    timeTo?: Date;

    @Optional()
    username?: string;
}
