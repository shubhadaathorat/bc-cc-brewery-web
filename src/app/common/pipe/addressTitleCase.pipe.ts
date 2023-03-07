import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressTitleCase'
})
/* Returns selected salon brand Details */
export class AddressTitleCasePipe implements PipeTransform {
  transform(address: string, isTrimState: boolean): string {
    return this.convertTitleCaseAndTrim(address, isTrimState);
  }

  convertTitleCaseAndTrim(myaddr: string, isTrimState: boolean) {
    let finalstr;
    if (isTrimState) {
      finalstr = myaddr.substring(0, myaddr.lastIndexOf(','));
    } else {
       finalstr = myaddr;
    }
    return finalstr.toLowerCase().split(' ').map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }
}
