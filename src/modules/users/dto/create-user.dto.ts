import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;

    @Optional()
    @IsUrl()
    picture: string;
}
