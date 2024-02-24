import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false,timestamps: true})
export class User {
    _id: Types.ObjectId;

    @Prop()
    name: string;
    @Prop()
    fullname: string;
    @Prop()
    email: string;
    @Prop()
    role: string;

}
export const UserSchema = SchemaFactory.createForClass(User);