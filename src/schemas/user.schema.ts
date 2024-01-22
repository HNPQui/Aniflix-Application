import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
    _id: Types.ObjectId;

    @Prop()
    name: string;
}
export const UserSchema = SchemaFactory.createForClass(User);