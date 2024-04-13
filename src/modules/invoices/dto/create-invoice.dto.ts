import { Types } from "mongoose";

export class CreateInvoiceDto {
    orderCode: number;
    amount: number;
    dateTime: Date;
    description: string;
    counterAccountBankName: string;
    counterAccountNumber: string;
    counterAccountName: string;
    user: Types.ObjectId;
    status: string;
}
