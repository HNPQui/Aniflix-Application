import { Optional } from "@nestjs/common";
import { IsMongoId, IsNotEmpty, Length } from "class-validator";
import { Types } from "mongoose";
import { ObjectIdTransform } from "src/pipes/mongoid-transformer.pipe";

export class CreateCommentDto {

    @Optional()
    @ObjectIdTransform()
    userId: Types.ObjectId;

    @IsNotEmpty()
    @ObjectIdTransform()
    videoId: Types.ObjectId;

    @IsNotEmpty()
    @Length(5, 200)
    content: string;
}
