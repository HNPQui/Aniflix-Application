import { Optional } from "@nestjs/common";
import { IsNotEmpty, Length, Max } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty()
    @Length(3, 20)
    name: string;

    @Optional()
    priority: number;
}
