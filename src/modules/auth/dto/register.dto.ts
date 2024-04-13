import { PartialType } from "@nestjs/mapped-types";
import { LoginAuthDto } from "./login.dto";
import { IsEmail } from "class-validator";
import { Optional } from "@nestjs/common";

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsEmail()
    email: string;

    @Optional()
    name: string;
}