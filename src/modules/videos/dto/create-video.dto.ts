import { IsBoolean, IsNotEmpty, Max } from "class-validator";

export class CreateVideoDto {

    @IsNotEmpty()
    @Max(50)
    
    title: string;
    @IsNotEmpty()
    @Max(50)
    description: string;

    @IsNotEmpty()
    @Max(1000)
    like_count: number;
 
    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    @IsBoolean()
    status: string;

  
}
