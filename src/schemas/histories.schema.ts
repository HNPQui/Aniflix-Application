import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HistoriesDocument = HydratedDocument<Histories>;

@Schema({ versionKey: false, timestamps: true})
export class Histories {

    _id: Types.ObjectId;

    @Prop()
    title: string;
    @Prop()
    video_id: string;
    @Prop()
    user_id: string;
   
    
}
export const HistoriesSchema = SchemaFactory.createForClass(Histories);