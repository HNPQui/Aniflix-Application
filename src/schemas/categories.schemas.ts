import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema({ versionKey: false })
export class Categories {

    _id: Types.ObjectId;

    @Prop()
    title: string;
    @Prop()
    name: string;
    @Prop()
    priority: number;

    
}
export const CategoriesSchema = SchemaFactory.createForClass(Categories);