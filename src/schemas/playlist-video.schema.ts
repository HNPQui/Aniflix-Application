import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PlaylistVideosDocument = HydratedDocument<PlaylistVideos>;

@Schema({ versionKey: false })
export class PlaylistVideos {

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
export const PlaylistVideosSchema = SchemaFactory.createForClass(PlaylistVideos);