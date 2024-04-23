import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Genre } from '../genres/genre.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ versionKey: false, timestamps: true })
export class Movie {
    _id: Types.ObjectId

    @Prop({
        type: [Types.ObjectId],
        ref: Genre.name
    })
    genres: Genre[];

    @Prop()
    popularity: number;

    @Prop()
    favorites: number;

    @Prop()
    airing: boolean;
    
    @Prop()
    type: string;

    @Prop({
        type: [String],
        default: []
    })
    list: string[]

    @Prop({
        default: 'FINISHED',
        enum: ['PENDING', 'FINISHED']
    })
    status: string;

    // @Prop()
    // streaming: string[];

}
export const MovieSchema = SchemaFactory.createForClass(Movie);