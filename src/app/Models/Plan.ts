import {Person} from './Person';
import { CalendarEvent } from 'angular-calendar';

export class Plan {
    userid: number;
    planname: string;
    plantext: string;
    createdAt: string;
    updatedAt: string;
    latitude: number;
    longitude: number;
    people: Person[];
    events: CalendarEvent[];
}
