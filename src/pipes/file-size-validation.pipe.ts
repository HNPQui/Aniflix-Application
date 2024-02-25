import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform<Express.Multer.File, boolean> {
    constructor(private readonly maxSize: number) { }

    transform(value: Express.Multer.File, metadata: ArgumentMetadata) : boolean {
        if (value.size > this.maxSize) {
            throw new BadRequestException(`File size should not exceed ${this.maxSize / 1024 / 1024} MB`);
        }
        return true;
    }
}