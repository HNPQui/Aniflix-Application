import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty } from 'class-validator';
import { ObjectIdTransform } from 'src/pipes/mongoid-transformer.pipe';
import { Types } from 'mongoose';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsNotEmpty()
    @ObjectIdTransform()
    commentId: Types.ObjectId;
}
