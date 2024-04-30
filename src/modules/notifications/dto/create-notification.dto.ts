import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateNotificationDto {

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsOptional()
    @IsUrl()
    url: string;
}
