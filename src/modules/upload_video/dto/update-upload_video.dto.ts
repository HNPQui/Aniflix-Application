import { PartialType } from '@nestjs/mapped-types';
import { CreateUploadVideoDto } from './create-upload_video.dto';

export class UpdateUploadVideoDto extends PartialType(CreateUploadVideoDto) {}
