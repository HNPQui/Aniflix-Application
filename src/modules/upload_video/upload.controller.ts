import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UploadVideoService } from './upload.service';
import { CreateUploadVideoDto } from './dto/create-upload.dto';
import { UpdateUploadVideoDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { Types } from 'mongoose';

@Controller("upload")
export class UploadVideoController {

  constructor(private readonly uploadVideoService: UploadVideoService) { }

  @Get()
  findAll() {
    return 'This action returns all uploadVideo';
  }

  @Post("image")
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return "File upload failed"
    }
    return file;
  }

  @Post('video/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(mp4|mkv)' }),
        ],
      }),
    ) file: Express.Multer.File,
    @Param('id', ParseMongoIdPipe) videoId: Types.ObjectId,
    ) {
    if (!file) {
      return "File upload failed"
    }
    this.uploadVideoService.convertToHls(file , videoId, () => {
      console.log('done');
    });
    console.log(file);
    return "File uploaded successfully"

  }

}
