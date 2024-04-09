import { Optional } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { ObjectIdTransform } from "src/pipes/mongoid-transformer.pipe";

export class CreateLikeDto {
    
    @IsNotEmpty()
    @ObjectIdTransform()
    videoId: Types.ObjectId;

    @Optional()
    @ObjectIdTransform()
    userId: Types.ObjectId;
}
