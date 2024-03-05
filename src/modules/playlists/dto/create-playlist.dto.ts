import { IsNotEmpty, Max } from "class-validator";

export class CreatePlaylistDto {
    @IsNotEmpty()
    @Max(10)
    title: string;
    @Max(100)
    description: string;
    @IsNotEmpty()
    tracks: string[];
}
