import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsUrl()
    picture: string;

    @IsEmail()
    email: string;
}
