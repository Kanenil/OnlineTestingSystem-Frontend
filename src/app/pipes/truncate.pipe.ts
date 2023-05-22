import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined, maxLength: number): string {
    if (value) {
      return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
    }
    return '';
  }
}
