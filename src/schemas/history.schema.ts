import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Video } from './video.schema';

export type HistoryDocument = HydratedDocument<History>;

@Schema({ versionKey: false, timestamps: true })
export class History {
    _id: Types.ObjectId;
    
    @Prop({
        type: [{
            type: Types.ObjectId,
            ref: Video.name
        }]
    })
    videos: Video[];

    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    user: User;
}
export const HistorySchema = SchemaFactory.createForClass(History);