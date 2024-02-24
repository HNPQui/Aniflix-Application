import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentsDocument = HydratedDocument<Comments>;

@Schema({ versionKey: false, timestamps: true })
export class Comments {

    _id: Types.ObjectId;

    @Prop()
    title: string;
    @Prop()
    user_id: string;
    @Prop()
    video_id: string;
    @Prop()
    content: string;
    @Prop()
    status: string;
   
    
}
export const CommentsSchema = SchemaFactory.createForClass(Comments);