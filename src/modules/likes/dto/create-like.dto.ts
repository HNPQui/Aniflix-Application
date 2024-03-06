import { Optional } from "@nestjs/common";
import { Types } from "mongoose";
import { ObjectIdTransform } from "src/pipes/mongoid-transformer.pipe";

export class CreateLikeDto {
    @ObjectIdTransform()
    videoId: Types.ObjectId;

    @Optional()
    userId: Types.ObjectId;
}
