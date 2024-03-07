import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ versionKey: false, timestamps: true })
export class Comment {

    _id: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    userId: User;

    @Prop()
    content: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);