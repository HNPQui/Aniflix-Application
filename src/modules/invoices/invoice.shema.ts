import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema({ versionKey: false, timestamps: true })
export class Invoice {
    _id: Types.ObjectId

    @Prop()
    orderCode: number;

    @Prop()
    amount: number;

    @Prop()
    dateTime: Date;

    @Prop()
    counterAccountBankName: string;

    @Prop()
    status: string;

    @Prop()
    description: string;

    @Prop()
    counterAccountNumber: string;

    @Prop()
    counterAccountName: string;

    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    user: User
}
export const InvoiceSchema = SchemaFactory.createForClass(Invoice);