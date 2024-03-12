import { Module } from '@nestjs/common';
import { UploadVideoService } from './upload_video.service';
import { UploadVideoController } from './upload_video.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  // import 
  imports:[
    MulterModule.register({
      dest: './upload',
    })
  ],
  controllers: [UploadVideoController],
  providers: [UploadVideoService],
})
export class UploadVideoModule {}
