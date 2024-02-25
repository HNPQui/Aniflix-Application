import { ArgumentMetadata, Injectable, PipeTransform, UnsupportedMediaTypeException } from "@nestjs/common";

@Injectable()
export class ImageValidationPipe implements PipeTransform<Express.Multer.File, boolean> {
    transform(value: Express.Multer.File, metadata: ArgumentMetadata): boolean {
        if (!value.mimetype.startsWith('image')) {
            throw new UnsupportedMediaTypeException('File must be an image');
        }
        return true;
    }
}