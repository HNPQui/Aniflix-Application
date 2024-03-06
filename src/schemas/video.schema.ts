import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Types } from 'mongoose';
import { Category } from './category.schema';

export type VideoDocument = HydratedDocument<Video>;

@Schema({ versionKey: false, timestamps: true, })
export class Video {

    _id: Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    thumbnail: string;

    @Prop({
        type: Date
    })
    date: Date;

    @Prop()
    views: number;

    @Prop({
        type: [
            { type: Types.ObjectId, ref: Category.name }
        ]
    })
    categories: Category[];

    @Prop()
    author: string;

    @Prop()
    status: string;

    @Prop({ type: Date, default: null })
    deletedAt: Date;

}
export const VideoSchema = SchemaFactory.createForClass(Video);