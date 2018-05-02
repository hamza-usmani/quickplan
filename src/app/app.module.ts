import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatCardModule, MatSlideToggleModule,
        MatMenuModule, MatToolbarModule, MatProgressSpinnerModule} from '@angular/material';
import {NgbModule, NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'angular-calendar';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { StartpageComponent } from './startpage/startpage.component';
import { PeopleComponent } from './people/people.component';
import { TheplanComponent } from './theplan/theplan.component';
import { SectionCardHeaderComponent } from './section-card-header/section-card-header.component';
import { WhenwhereComponent } from './whenwhere/whenwhere.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationService } from './Services/authentication.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './Services/profile.service';
import { PlanService } from './Services/plan.service';
import { environment } from '../environments/environment';
import { SharedplanComponent } from './sharedplan/sharedplan.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainpageComponent,
    StartpageComponent,
    PeopleComponent,
    TheplanComponent,
    SectionCardHeaderComponent,
    WhenwhereComponent,
    CalendarHeaderComponent,
    DatetimePickerComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    SharedplanComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgbModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.mapsapikey,
      libraries: ['places']
    }),
    CalendarModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    ProfileService,
    PlanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
