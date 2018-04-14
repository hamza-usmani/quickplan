import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ViewplanComponent } from './viewplan/viewplan.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartpageComponent},
  { path: 'plan' , component: MainpageComponent},
  { path: 'view' , component: ViewplanComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
