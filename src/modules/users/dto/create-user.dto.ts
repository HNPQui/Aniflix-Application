import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsUrl()
    picture?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    phone?: string;
}
