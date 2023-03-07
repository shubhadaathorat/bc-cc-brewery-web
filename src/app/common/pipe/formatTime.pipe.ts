import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatTime'
})
/**
 * Returns time in format of HH:MM A.M./P.M. from a supplied
 * number. 
 * Uses moment js methods to format.
 */
export class FormatTimePipe implements PipeTransform {

  transform(availableTime: string): string {
    if (availableTime) {
      let time24 = this.convertTime12to24(availableTime);
      let actualTime = time24.split(':');
      const displayTime: string = moment({ hour: +actualTime[0], minute: +actualTime[1] }).format('LT');
      return displayTime.toLowerCase();
    }
  }


  convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }
}
