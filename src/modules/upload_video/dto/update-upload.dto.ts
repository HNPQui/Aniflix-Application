import { PartialType } from '@nestjs/mapped-types';
import { CreateUploadVideoDto } from './create-upload.dto';

export class UpdateUploadVideoDto extends PartialType(CreateUploadVideoDto) {}
