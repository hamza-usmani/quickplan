import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  modalRef: NgbModalRef;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  refresh: Subject<any> = new Subject();
  modalData: {
    type: 'signup' | 'login';
    footerText: string;
  };

  constructor(private router: Router, private modal: NgbModal, private _authenticationService: AuthenticationService) {
    if (_authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/profile');
    }
  }

  ngOnInit() {
  }

  goToPlan() {
    this.router.navigate(['/start']);
  }

  openSignup() {
    this.modalData = {
      type: 'signup',
      footerText: 'Sign up to save and share plans!'
    };
    this.modalRef = this.modal.open(this.modalContent, { size: 'lg' });
  }

  openLogin() {
    this.modalData = {
      type: 'login',
      footerText: 'Login to your QuickPlan account to view your saved plans.'
    };
    this.modalRef = this.modal.open(this.modalContent, { size: 'lg' });
  }
}
