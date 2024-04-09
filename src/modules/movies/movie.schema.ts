import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Genre } from '../genres/genre.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ versionKey: false, timestamps: true })
export class Movie {
    _id: Types.ObjectId;

    @Prop()
    images: string;

    @Prop()
    title: string;

    @Prop()
    episodes: number;

    @Prop()
    type: string;

    @Prop()
    source: string;

    @Prop()
    score: number;

    @Prop()
    synopsis: string;

    @Prop()
    background: string;

    @Prop()
    year: number;

    @Prop({
        type: [Types.ObjectId],
        ref: Genre.name
    })
    genres: Genre[];

    @Prop()
    streaming: string;

    @Prop()
    duration: string;

    @Prop()
    rating: string;

    @Prop()
    rank: number;

    @Prop()
    season: string;
    
    @Prop({
        type: [String]
    })
    studios: String[];
    @Prop({
        type: [String]
    })
    producers: String[];

}
export const MovieSchema = SchemaFactory.createForClass(Movie);