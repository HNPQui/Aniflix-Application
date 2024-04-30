import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';

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

    @Prop()
    url: string;

    @Prop({
        type: [Types.ObjectId],
        ref: User.name,
        default: []
    })
    users: Types.ObjectId[];
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
