import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({name: 'datePipe'})
export class CustomDatePipe implements PipeTransform {
  constructor() {
  }

  // adding a default format in case you don't want to pass the format
  // then 'yyyy-MM-dd' will be used
  transform(date: Date | string, day: number, format: string = 'yyyy-MM-dd'): string {
    date = new Date(date);  // if orginal type was a string
    date.setDate(date.getDate() - day);
    // @ts-ignore
    return new DatePipe('en-US').transform(date, format).toString();
  }
}
