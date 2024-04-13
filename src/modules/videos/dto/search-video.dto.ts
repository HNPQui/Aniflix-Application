import { Optional } from "@nestjs/common";
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class QuerySearchVideoDto {

    @IsOptional()
    keyword?: string;

    @IsOptional()
    @IsNumberString()
    page?: number;

    @IsOptional()
    @IsNumberString()
    limit?: number;

    @IsOptional()
    type?: string;

    @IsOptional()
    @IsEnum(['airing', 'favorites', "popularity"], { message: "filter must be one of 'airing', 'favorites', 'popularity'" })
    filter?: string;
}
