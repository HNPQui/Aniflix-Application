import { Module } from '@nestjs/common';
import { UploadVideoService } from './upload.service';
import { UploadVideoController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from '../movies/movie.schema';

@Module({
  // import 
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      }
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/uploads');
        },
        filename: (req, file, cb) => {
          const fileExtName = file.mimetype.split('/')[1];
          const randomName = Date.now() + '_' + Math.round(Math.random() * 1e5);
          cb(null, `${randomName}.${fileExtName}`);
        }
      })
    })
  ],
  controllers: [UploadVideoController],
  providers: [UploadVideoService],
})
export class UploadVideoModule { }
