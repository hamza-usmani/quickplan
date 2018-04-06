import { Component, OnInit, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  CalendarEvent, CalendarViewPeriod, CalendarMonthViewBeforeRenderEvent,
  CalendarEventAction, CalendarEventTimesChangedEvent, CalendarDateFormatter, DateFormatterParams
} from 'angular-calendar';
import {
  startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

export class CustomDateFormatter extends CalendarDateFormatter {
  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'EEE', locale);
  }
}

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
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  modalData: {
    date: Date;
    eventsOnDay: CalendarEvent[]
  };

  view = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  period: CalendarViewPeriod;
  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();

  constructor(private cdr: ChangeDetectorRef, private modal: NgbModal) {
    this.title = 'when';
   }


  ngOnInit() {
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('day clicked: ' + date);
    this.handleEvent(date);
  }

  addEvent(date: Date): void {
    const oldevents = this.events;
    this.events = Object.assign([], oldevents);
    this.events.push({
      title: 'New event',
      start: date,
      end: addDays(date, 1),
      color: this.colors.red
    });
    this.refresh.next();
  }

  handleEvent(date: Date): void {
    console.log('handling event');
    this.events.forEach(c =>  console.log(c.start.toString() + "vs clicked: " + date.toString() ));
    const eventsonday: CalendarEvent[] = this.events.filter(c =>  c.start.toString() === date.toString());
    console.log(eventsonday);
    this.modalData = { date: date, eventsOnDay: eventsonday };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

}
