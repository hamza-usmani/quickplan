import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl} from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {  fabric  } from 'fabric';
import { Subject } from 'rxjs/Subject';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { PlanService } from '../Services/plan.service';

@Component({
  selector: 'app-theplan',
  templateUrl: './theplan.component.html',
  styleUrls: ['./theplan.component.css'],
})
export class TheplanComponent implements OnInit {
  title = 'The Plan';
  planText = '';
  options: Object = {
    placeholderText: 'Details of your plan here!',
    toolbarSticky: false,
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'paragraphFormat', 'fontSize', 'fontFamily', 'color', 'formatOL'],
    quickInsertTags: []
  };
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private _planService: PlanService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.zoom = 6;
    this.latitude = 43.595310;
    this.longitude = -79.640579;

    this.searchControl = new FormControl();
    /* if (!this._planService.currentPlan.latitude || !this._planService.currentPlan.longitude) {
      this.setCurrentPosition();
    }*/

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    if (this._planService.currentPlan.planname) {
      this.planText = this._planService.currentPlan.plantext;
    }
    if (this._planService.currentPlan.address) {
      this.searchControl.setValue(this._planService.currentPlan.address);
    }
    if (this._planService.currentPlan.latitude && this._planService.currentPlan.longitude) {
      this.latitude = parseFloat(this._planService.currentPlan.latitude.toString());
      this.longitude = parseFloat(this._planService.currentPlan.longitude.toString());
      this.zoom = 15;
    }
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  savePlan() {
    this._planService.currentPlan.plantext = this.planText;
    this._planService.currentPlan.address = this.searchElementRef.nativeElement.value;
    this._planService.currentPlan.latitude = this.latitude;
    this._planService.currentPlan.longitude = this.longitude;
  }

}
