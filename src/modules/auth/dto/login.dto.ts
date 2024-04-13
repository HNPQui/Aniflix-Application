import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginAuthDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
