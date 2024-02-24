import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Types } from 'mongoose';

export type VideosDocument = HydratedDocument<Videos>;

@Schema({ versionKey: false, timestamps: true, })
export class Videos {

    _id: Types.ObjectId;

    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    like_count: number;
    @Prop()
    categories_id: string;
    @Prop()
    author: string;
    @Prop()
    status: string;

    @Prop({ type: Date, default: Date.now })
    deletedAt: Date;

}
export const VideosSchema = SchemaFactory.createForClass(Videos);