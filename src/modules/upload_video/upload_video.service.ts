import { Injectable } from '@nestjs/common';
import { CreateUploadVideoDto } from './dto/create-upload_video.dto';
import { UpdateUploadVideoDto } from './dto/update-upload_video.dto';

@Injectable()
export class UploadVideoService {
  create(createUploadVideoDto: CreateUploadVideoDto) {
    
    return 'This action adds a new uploadVideo';
  }

}
