import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type Playlists_videosDocument = HydratedDocument<Playlists_videos>;

@Schema({ versionKey: false })
export class Playlists_videos {

    _id: Types.ObjectId;

    @Prop()
    title: string;
    @Prop()
    playlist_id: string;
    @Prop()
    video_id: string;
    @Prop()
    position: number;
    
}
export const Playlists_videosSchema = SchemaFactory.createForClass(Playlists_videos);