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
<<<<<<< HEAD:src/schemas/playlist.schema.ts
=======
    @Prop()
    description: string;
    @Prop()
    tracks: string[];
    

   
>>>>>>> 7c5f541463db8b1270879b3197f36c947b8b9507:src/schemas/playlists.schemas.ts
    
}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);