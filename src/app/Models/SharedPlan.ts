import {Person} from './Person';
import { CalendarEvent } from 'angular-calendar';

class EventDetails {
    title: string;
    start: Date;
    end: Date;
    primarycolour: string;
    secondarycolour: string;
}

class SharedPlanDetails {
    planname: string;
    plantext: string;
    address: string;
    latitude: number;
    longitude: number;
    people: any;
    events: EventDetails[];
}

export class SharedPlan {
    planname: string;
    plantext: string;
    address: string;
    latitude: number;
    longitude: number;
    people: Person[];
    events: CalendarEvent[];

    constructor(sharedPlanDetails?: SharedPlanDetails) {
        if (sharedPlanDetails) {
            this.planname = sharedPlanDetails.planname;
            this.plantext = sharedPlanDetails.plantext;
            this.address = sharedPlanDetails.address;
            this.latitude = parseFloat(sharedPlanDetails.latitude.toString());
            this.longitude = parseFloat(sharedPlanDetails.longitude.toString());
            this.people = new Array();
            sharedPlanDetails.people.forEach(p => {
                this.people.push({
                    id: p.personid,
                    name: p.name
                });
            });
            this.events = new Array();
            sharedPlanDetails.events.forEach(e => {
                this.events.push({
                    start: new Date(e.start),
                    end: new Date(e.end),
                    title: e.title,
                    color: {
                        primary: e.primarycolour,
                        secondary: e.secondarycolour
                    }
                });
            });
        }
    }
}
