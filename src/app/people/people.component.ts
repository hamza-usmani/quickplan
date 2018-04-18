import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import {Person} from '../Models/Person';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  title: string;
  people: Person[];
  peopleForm: FormGroup;

  constructor(private _sharedService: SharedService) {
    this.title = 'people';
    this.people = new Array(0);
    const firstPerson = new Person(1);
    this.people.push(firstPerson);
    this.peopleForm = new FormGroup({});
  }

  ngOnInit() {
  }

  newPerson(): void {
    const nextPerson = new Person(this.people.length + 1);
    this.people.push(nextPerson);
  }

  deletePerson(index: number): void {
      this.people.splice(index, 1);
  }

  savePlan() {
    this._sharedService.currentPlan.people = this.people;
  }
}
