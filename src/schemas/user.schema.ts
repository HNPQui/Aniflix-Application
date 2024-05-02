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
        required: true,
        default: ""
    })
    username: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        type: [String],
        default: []
    })
    fcm_token: string[];

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
        default: true
    })
    status: boolean;


    @Prop({
        type: Object,
        default: null
    })
    otp: {
        code: string,
        expire: Date
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
const UserSchema = SchemaFactory.createForClass(User);
UserSchema.path('name').get(function (name) {
    if (this.isPremium) {
        return name + ' 👑';
    } else {
        return name;
    }
})
export { UserSchema }