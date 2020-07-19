import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

/**
 * Strip undefined properties from body.
 */
@Injectable()
export class StripUndefinedPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type === 'body') {
      this.dropUndefined(value);
      return value;
    }
    return value;
  }

  private dropUndefined(obj: unknown) {
    for (const key of Object.keys(obj)) {
      if (obj[key] === undefined) {
        delete obj[key];
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.dropUndefined(obj[key]);
      }
    }
  }
}
