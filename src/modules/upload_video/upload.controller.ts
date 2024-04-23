import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ParseIntPipe, Query } from '@nestjs/common';
import { UploadVideoService } from './upload.service';
import { CreateUploadVideoDto } from './dto/create-upload.dto';
import { UpdateUploadVideoDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ParseMongoIdPipe } from 'src/pipes/mongoid-validation.pipe';
import { Types } from 'mongoose';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as fs from 'fs';

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
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        let path = 'public/uploads';
        let { id: videoId } = req.params;
        if (videoId) {
          path += `/${videoId}`;
        }
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, { recursive: true });
        }
        cb(null, path);
      },
      filename: (req, file, cb) => {
        let { ep } = req.query;
        const fileExtName = file.mimetype.split('/')[1];
        const randomName = ep || Date.now() + '_' + Math.round(Math.random() * 1e5);
        cb(null, `${randomName}.${fileExtName}`);
      }
    })
  }))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(mp4|mkv)' }),
        ],
      }),
    ) file: Express.Multer.File,
    @Param('id', ParseMongoIdPipe) videoId: Types.ObjectId,
    @Query('ep', ParseIntPipe) ep: number
  ) {
    if (!file) {
      return "File upload failed"
    }
    return this.uploadVideoService.updateEpisodes(videoId, file.filename, ep);

    
  }
}
