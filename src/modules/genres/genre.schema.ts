import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema({ versionKey: false, timestamps: true })
export class Genre {
    _id: Types.ObjectId;

    @Prop()
    name: string;

}
export const GenreSchema = SchemaFactory.createForClass(Genre);