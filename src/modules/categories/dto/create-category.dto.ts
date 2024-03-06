import { IsBoolean, IsNotEmpty, Max } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty()
    @Max(20)
    title: string;
    
    @IsNotEmpty()
    @Max(20)
    name: string;

    @IsNotEmpty()
    @Max(100)
    priority: number;
    @IsNotEmpty()
    @IsBoolean()
    status: string;
}
