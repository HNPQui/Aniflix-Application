import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Video } from 'src/modules/videos/entities/video.entity';

export type CommentsDocument = HydratedDocument<Comments>;

@Schema({ versionKey: false, timestamps: true })
export class Comments {

    _id: Types.ObjectId;

    @Prop()
    title: string;

    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    user_id: User;

    @Prop({
        type: Types.ObjectId,
        ref: Video.name
    })
    video_id: Video;
    @Prop()

    content: string;

    @Prop()
    status: string;


}
export const CommentsSchema = SchemaFactory.createForClass(Comments);