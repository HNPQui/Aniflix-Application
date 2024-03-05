import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LikesDocument = HydratedDocument<Likes>;

@Schema({ versionKey: false , timestamps: true})
export class Likes {

    _id: Types.ObjectId;

    @Prop()
    title: string;
    @Prop()
    video_Id: string;
    @Prop()
    user_Id: string;
    @Prop()
    status: string;
    @Prop()
    type: string;
    
    
    
    
    
}
export const LikesSchema = SchemaFactory.createForClass(Likes);