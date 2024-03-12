import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UploadVideoService } from './upload_video.service';
import { CreateUploadVideoDto } from './dto/create-upload_video.dto';
import { UpdateUploadVideoDto } from './dto/update-upload_video.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class UploadVideoController {
  @Post('upload-videos')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(mp4|mkv)'}),
        ],
      }),
    ) file: Express.Multer.File) {

    if (!file) {
      throw new Error('Erorr!!')
    }
    console.log('File Upload ', file);
    return { message: ('File upload success') }

  }
  
}
