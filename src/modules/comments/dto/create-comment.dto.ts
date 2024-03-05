import { IsBoolean, IsNotEmpty, Max } from "class-validator";

export class CreateCommentDto {
    
    @IsNotEmpty()
    @Max(20)
    title: string;

    @IsNotEmpty()
    @Max(100)
    content: string;

  
    @IsNotEmpty()
    @IsBoolean()
    status: string;

    @IsNotEmpty()
    likes: number;
    @IsNotEmpty()
    dislikes: number;
    @IsNotEmpty()
    replies: number;
}
