import { IsDate, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateNotificationDto {

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsOptional()
    @IsDate()
    schedule: Date;

    @IsOptional()
    @IsUrl()
    url: string;
}
