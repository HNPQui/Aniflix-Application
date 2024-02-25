import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { Types } from "mongoose";

export function ObjectIdTransform() {
    return Transform(({ value }) => {
        if (Types.ObjectId.isValid(value) === false) {
            throw new BadRequestException('Invalid ObjectId');
        }
        return new Types.ObjectId(value);
    })
}