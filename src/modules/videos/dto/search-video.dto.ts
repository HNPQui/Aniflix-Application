import { IsNotEmpty } from "class-validator";

export class QuerySearchVideoDto {

    @IsNotEmpty()
    keyword: string;
}
