import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'ssc-calendar',
  templateUrl: './ssc-calendar.component.html',
  styleUrls: ['./ssc-calendar.component.less']
})
export class SscCalendarComponent implements OnInit {

  constructor() { }  
  private _prefixCls = 'ssc-calendar';

  private _today = moment();
  private _selected: any;
  private _month: any = this._today.clone();

  currentClasses: {};

  @Input()
  set prefixCls(value: string) {
    this._prefixCls = value;
    // this.setCurrentClasses(); // todo
  }
  get prefixCls(): string {
    return this._prefixCls;
  }

  @Input()
  set selectedDay(value: any) {
    if(value){
      let m = value;
      if(!moment.isMoment(value)){
        m = moment(m);
      }
      if(m.isValid()){
        this._month = m.clone();
        this._selected = m.clone();
      }
    }
  }
  get selectedDay(): any {
    return this._selected;
  }

  @Output()
  selectedDayChange = new EventEmitter<any>();

  select(value: string) {
    var date = this._month.clone().date(value)
    this._selected = date
    this.selectedDayChange.emit(date);
    // this.didVote = true;
  }

  jump(value: number) {
    this._month = this._month.add(value, 'month');
  }

  get year(): string{
    return this._month.year();
  }

  get month(): string{
    let month = this._month.month();
    return moment.months()[month];
  }

  get weekdaysMin(): string[]{
    return moment.weekdaysMin();
  }

  _firstDayOfMonth(): any{
    return this._month.clone().set('date', 1);    
  }
  _lastDayOfMonth(): any{
    return this._month.clone().set('date', 1).add(1, 'month').set('date', 0);    
  }
  _sameDay(a, b){
    return (
      a.year() == b.year()
      && a.month() == b.month()
      && a.date() == b.date()
    )
  }

  get calendarDays(): number[]{
    let monthStart = this._firstDayOfMonth();
    let monthEnd = this._lastDayOfMonth();

    let start = this._firstDayOfMonth().day(0);
    let end = start.clone().day(41);

    let days = [];
    let day = start;
    let i = 0, j, className: string

    while (day <= end) {
      days[i] = []
      for (j=0; j<7; j+=1) {
        if (day < monthStart){
          className = 'before'
        }
        else if(day>monthEnd){
          className = 'after'
        }
        else if(this._sameDay(this._today, day)){
          className = 'today'
        }
        else {
          className = ''
        }
        if(this._selected && this._sameDay(this._selected, day)){
          className = 'selected ' + className
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
