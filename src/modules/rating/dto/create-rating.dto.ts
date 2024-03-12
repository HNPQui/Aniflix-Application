import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateRatingDto {

    @IsNotEmpty()
    
    Video:Types.ObjectId

    @IsNotEmpty()
    rating:[

    ]

}
