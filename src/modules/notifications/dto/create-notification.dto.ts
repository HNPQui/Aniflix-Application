import { IsDate, IsDateString, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateNotificationDto {

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsOptional()
    @IsDateString()
    schedule?: Date;

    @IsOptional()
    @IsUrl()
    url?: string;
}
