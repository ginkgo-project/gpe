import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'property'
})
export class PropertyPipe implements PipeTransform {

  transform(values: any[], property: string): any[] {
    let ret = values.map(value => value[property]);
    return ret;
  }

}
