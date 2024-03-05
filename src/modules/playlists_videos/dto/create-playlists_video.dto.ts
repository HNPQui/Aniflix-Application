import { IsBoolean, IsNotEmpty, IsNumber, Max, isBoolean } from "class-validator";

export class CreatePlaylistsVideoDto {

    @IsNotEmpty()
    @Max(100)
    title: string;

    @IsNumber()
    position: number;

    @IsNotEmpty()
    @IsBoolean()
    status: string;

    @IsNotEmpty()
    duration: string;

    @IsNotEmpty()
    thumbnail: string;

}
