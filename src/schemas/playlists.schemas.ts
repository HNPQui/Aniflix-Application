import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PlaylistsDocument = HydratedDocument<Playlists>;

@Schema({ versionKey: false, timestamps: true})
export class Playlists {

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
export const PlaylistsSchema = SchemaFactory.createForClass(Playlists);