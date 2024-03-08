import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Video } from './video.schema';

export type LikeDocument = HydratedDocument<Like>;

@Schema({
    versionKey: false, timestamps: true
})
export class Like {
    _id: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: Video.name
    })
    video: Video;

    @Prop({
        type: [Types.ObjectId],
        ref: User.name
    })
    users: User[];

    likesCount: number;
}
const LikeSchema = SchemaFactory.createForClass(Like);

export { LikeSchema as LikesSchema };