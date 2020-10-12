import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class StripUndefinedPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
    private dropUndefined;
}
