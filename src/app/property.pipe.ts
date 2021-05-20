import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'property',
})
export class PropertyPipe implements PipeTransform {
  transform(values: any[], property: string): any[] {
    const ret = values.map((value) => value[property]);
    return ret;
  }
}
