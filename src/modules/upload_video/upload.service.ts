import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
const ffmpeg = require('fluent-ffmpeg');
import * as fs from 'fs';

@Injectable()
export class UploadVideoService {
  convertToHls(file: Express.Multer.File, videoId: Types.ObjectId, onEnd: () => void){
    const segmentPath = './videos/' + videoId;
    fs.mkdirSync(segmentPath);
    ffmpeg().input(file.path) //input file
      .format('hls') //format
      .videoCodec('libx264') //high quality
      .audioCodec('aac') //audio quality
      .outputOptions([
        '-preset veryfast', // encoding speed
        '-sc_threshold 0', // set threshold for scene change detection
        '-hls_time 30', // 30 second segment duration
        '-hls_list_size 0', // Max number of playlist entries 0 means all
        `-hls_segment_filename ${segmentPath}/output_%03d.ts`
      ]).on('end', () => {
        onEnd();
      }).on('error', (err, stdout, stderr) => {
        if (err) {
          console.log(err.message);
          console.log("stdout:\n" + stdout);
          console.log("stderr:\n" + stderr);
        }
      }).save(segmentPath + '/playlist.m3u8');
    return 'This action adds a new uploadVideo';
  }

}
