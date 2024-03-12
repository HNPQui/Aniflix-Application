import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type RatingDocument = HydratedDocument<Rating>;

@Schema({ versionKey: false, timestamps:true   })
export class Rating {

    @Prop()
    userId: String;

    @Prop()
    Video: Types.ObjectId;

    //  @Prop({ required: true, min: 1, max: 5 }) // Điểm đánh giá từ 1 đến 5 sao
    //stars: number;

    @Prop()
    ratings: {
        type: Types.ObjectId,
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
        default: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 }
    }

    @Prop({ default: Date.now })
    createdAt: Date;

}
export const RatingSchema = SchemaFactory.createForClass(Rating);