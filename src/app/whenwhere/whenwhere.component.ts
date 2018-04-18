import { Component, OnInit, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe, Time } from '@angular/common';
import {
  CalendarEvent, CalendarViewPeriod, CalendarMonthViewBeforeRenderEvent,
  CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDateFormatter, DateFormatterParams
} from 'angular-calendar';
import {
  startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { EventColor } from 'calendar-utils';
import {SharedService} from '../Services/shared.service';

export class CustomDateFormatter extends CalendarDateFormatter {
  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'EEE', locale);
  }
}

export const colors: EventColor[] = [
  { // red
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  { // blue
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  { // yellow
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  { // green
    primary: '#42ba37',
    secondary: '#cbfcc7'
  },
  { // purple
    primary: '#792399',
    secondary: '#d9a6ed'
  }
];

@Component({
  selector: 'app-whenwhere',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './whenwhere.component.html',
  styleUrls: ['./whenwhere.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})

export class WhenwhereComponent implements OnInit {
  title: string;
  colorIndex = 0;
  modalRef: NgbModalRef;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  modalData: {
    date: Date;
    eventsOnDay: CalendarEvent[]
  };
  view = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  newEvent: CalendarEvent;
  period: CalendarViewPeriod;
  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  errorState = false;

  constructor(private cdr: ChangeDetectorRef, private modal: NgbModal, private _sharedService: SharedService) {
    this.title = 'when';
   }

  ngOnInit() {
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.errorState = false;
    this.handleEvent(date);
  }

  addEvent() {
    if (this.newEvent.end < this.newEvent.start) {
      this.errorState = true;
    } else {
        this.errorState = false;
        const oldevents = this.events;
        this.events = Object.assign([], oldevents);
        this.events.push({
          title: this.newEvent.title,
          start: this.newEvent.start,
          end: this.newEvent.end,
          color: this.newEvent.color
        });
        this.refresh.next();
        this.modalRef.close();
    }
  }

  deleteEvent(event) {
    const oldevents = this.events;
    this.events = Object.assign([], oldevents.filter(e => e !== event));
    this.refresh.next();
  }

  handleEvent(date: Date): void {
    if (this.colorIndex === colors.length) {
      this.colorIndex = 0;
    }
    this.newEvent = {
      title: '',
      start: date,
      end: date,
      color: colors[this.colorIndex]
    };
    this.colorIndex++;
    const eventsonday: CalendarEvent[] = this.events.filter(c =>  c.start.toLocaleDateString() === date.toLocaleDateString());
    this.modalData = { date: date, eventsOnDay: eventsonday };
    this.modalRef = this.modal.open(this.modalContent, { size: 'lg' });
  }

  savePlan() {
    this._sharedService.currentPlan.events = this.events;
  }

}
