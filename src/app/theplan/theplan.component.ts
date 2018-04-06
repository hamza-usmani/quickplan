import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl} from '@angular/forms';
import {SharedService} from '../Services/shared.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {  fabric  } from 'fabric';
import { Subject } from 'rxjs/Subject';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-theplan',
  templateUrl: './theplan.component.html',
  styleUrls: ['./theplan.component.css'],
})
export class TheplanComponent implements OnInit {
  title: string;
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

  constructor(private _sharedService: SharedService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.title = 'the plan';
  }

  ngOnInit() {
    this.zoom = 6;
    this.latitude = 43.595310;
    this.longitude = -79.640579;

    this.searchControl = new FormControl();
    this.setCurrentPosition();

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
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
