import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Comment } from './comment.schema';

export type BucketCommentDocument = HydratedDocument<BucketComment>;

@Schema({ versionKey: false, timestamps: true })
export class BucketComment {

    _id: Types.ObjectId;

    @Prop({
        index: true
    })
    videoId: Types.ObjectId;

    @Prop({
        type: [
            {
                type: Comment
            }
        ]
    })
    comments: Comment[];

    @Prop()
    count: number;
}
export const BucketCommentSchema = SchemaFactory.createForClass(BucketComment);