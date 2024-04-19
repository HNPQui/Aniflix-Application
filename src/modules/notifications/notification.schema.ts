import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
    versionKey: false, timestamps: true
})
export class Notification {
    _id: Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    content: string;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
