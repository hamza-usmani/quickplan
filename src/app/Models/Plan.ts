import {Person} from './Person';
import { CalendarEvent } from 'angular-calendar';

class EventDetails {
    eventid: number;
    planid: number;
    userid: number;
    title: string;
    start: Date;
    end: Date;
    primarycolour: string;
    secondarycolour: string;
}

class PlanDetails {
    planid: number;
    userid: number;
    planname: string;
    plantext: string;
    createdAt: Date;
    updatedAt: Date;
    address: string;
    latitude: number;
    longitude: number;
    people: Person[];
    events: EventDetails[];
}

export class Plan {
    planid: number;
    userid: number;
    planname: string;
    plantext: string;
    createdAt: Date;
    updatedAt: Date;
    address: string;
    latitude: number;
    longitude: number;
    people: Person[];
    events: CalendarEvent[];

    constructor(planDetails?: PlanDetails) {
        if (planDetails) {
            this.planid = planDetails.planid;
            this.userid = planDetails.userid;
            this.planname = planDetails.planname;
            this.plantext = planDetails.plantext;
            this.createdAt = new Date(planDetails.createdAt);
            this.updatedAt = new Date(planDetails.updatedAt);
            this.address = planDetails.address;
            this.latitude = planDetails.latitude;
            this.longitude = planDetails.longitude;
            this.people = planDetails.people;
            this.events = new Array();
            planDetails.events.forEach(e => {
                this.events.push({
                    id: e.planid,
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


