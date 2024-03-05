import { IsNotEmpty, Max } from "class-validator";

export class CreateHistoryDto {
    

    @IsNotEmpty()
    @Max(100)
    title: string;

    @IsNotEmpty()
    @Max(100)
    description: string;
   
    @IsNotEmpty()
    thumbnail: string;
    @IsNotEmpty()
    duration: string;
    @IsNotEmpty()
    views: number;
    @IsNotEmpty()
    likes: number;
    @IsNotEmpty()
    dislikes: number;
    @IsNotEmpty()
    @Max(100)
    comments: number;
   
}
