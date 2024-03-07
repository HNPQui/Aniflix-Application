import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ versionKey: false, timestamps: true})
export class Playlist {

    _id: Types.ObjectId;
    @Prop()
    title: string;

    @Prop()
    user_id: string;
    @Prop()
    description: string;
    @Prop()
    tracks: string[];
    
}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);