import { IsBoolean, IsNotEmpty, Max } from "class-validator";

export class CreateLikeDto {


    @IsNotEmpty()
    @Max(100)
    title: string;

    @IsNotEmpty()
    @IsBoolean()
    status: string;

    @IsNotEmpty()

    type: string;


}
