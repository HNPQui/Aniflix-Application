import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsPhoneNumber('VN')
    phone: string;

    @IsEmail()
    email: string;
}
