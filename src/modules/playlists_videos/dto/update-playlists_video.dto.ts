import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistsVideoDto } from './create-playlists_video.dto';

export class UpdatePlaylistsVideoDto extends PartialType(CreatePlaylistsVideoDto) {}
