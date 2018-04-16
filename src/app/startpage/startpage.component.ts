import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  title: string;
  buttonText: string;
  planname: string;

  constructor(private router: Router) {
    this.title = 'Name your plan';
    this.buttonText = 'Plan';
  }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/plan'], { queryParams: { name: this.planname } });
  }

}
