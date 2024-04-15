import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from 'src/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
    _id: Types.ObjectId;

    @Prop({
        default: "No name"
    })
    name: string;

    @Prop({
        required: true
    })
    username: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        default: ""
    })
    picture: string;

    @Prop({
        default: 0
    })
    point: number;

    @Prop({
        default: ""
    })
    phone: string;

    @Prop({
        type : Object,
        default: null
    })
    otp : {
        code : string,
        expire : Date
    }

    @Prop({
        default: false
    })
    isPremium: boolean;

    @Prop({
        default: ""
    })
    email: string;

    @Prop({
        type: [String],
        enum: Role,
        default: [Role.USER]
    })
    role: Role[];

}
export const UserSchema = SchemaFactory.createForClass(User);