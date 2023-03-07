import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removewhitespace'
})
/**
 * Returns text in format with all white spaces trimed
 * number. 
 * Uses moment js methods to format.
 */
export class WhiteSpaceTrimPipe implements PipeTransform {

    transform(trimText: string, args?: any): string {
        return trimText.replace(/ /g, '');
      }

}
