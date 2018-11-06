import { Component, OnInit, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'ssc-calendar',
  templateUrl: './ssc-calendar.component.html',
  styleUrls: ['./ssc-calendar.component.less']
})
export class SscCalendarComponent implements OnInit {

  constructor() { }  
  private _prefixCls = 'ssc-button';
  private _today = new Date();
  private _month;
  private _moment: any;
  private _selectedDay: Date;

  currentClasses: {};

  @Input()
  set prefixCls(value: string) {
    this._prefixCls = value;
    // this.setCurrentClasses();
  }

  get prefixCls(): string {
    return this._prefixCls;
  }

  @Input()
  set selectedDay(value: Date) {
    this._selectedDay = value;
  }

  get selectedDay(): Date {
    return this._selectedDay;
  }

  @Input()
  set setMonth(value) {
    this._month = value;
  }

  prev() {
    this._month = this._month.add(1, 'month');
  }

  get year(): string{
    this._moment = moment(this._selectedDay?this._selectedDay:this._today);
    if(this._month && this._month.isValid() !== undefined){
      this._moment = this._month;
    }
    return this._moment.year();
  }

  get month(): string{
    this._moment = moment(this._selectedDay?this._selectedDay:this._today);
    if(this._month && this._month.isValid() !== undefined){
      this._moment = this._month;
    }
    let month = this._moment.month();
    return moment.months()[month];
  }

  get weekdaysMin(): string[]{
    return moment.weekdaysMin();
  }

  get firstDay(): Date{
    this._moment = moment(this._selectedDay?this._selectedDay:this._today);
    let firstDayOfMonth = this._moment.clone().set('date', 1);    
    return firstDayOfMonth.day(-1);
  }

  get calendarDays(): number[]{
    this._moment = moment(this._selectedDay?this._selectedDay:this._today);
    if(this._month && this._month.isValid() !== undefined){
      this._moment = this._month;
    }
    let firstDayOfMonth = this._moment.clone().set('date', 1);  
    let lastDayOfMonth = this._moment.clone().add(1, 'month').set('date', 0);  
    let start = firstDayOfMonth.clone().day(0)
    let end = moment(start).day(34);

    let days = [];
    let day = start;
    let i = 0, j, className:string

    while (day <= end) {
      days[i] = []
      for (j=0; j<7; j+=1) {
        if (day < firstDayOfMonth){
          className = 'before'
        }
        else if(day>lastDayOfMonth){
          className = 'after'
        }
        else if(day.diff(this._today, 'days') == 0){
          className = 'today'
        }
        else {
          className = ''
        }
        days[i].push({date:day.date(), className: className});
        day = day.clone().add(1, 'd');
      }
      i+=1;
    }

    return days;
  }

  ngOnInit() {
  }

}
