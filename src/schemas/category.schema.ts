import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ versionKey: false })
export class Category {

    _id: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    priority: number;
}
export const CategorySchema = SchemaFactory.createForClass(Category);