import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-license-eligibility-check',
  templateUrl: './license-eligibility-check.component.html',
  styleUrls: ['./license-eligibility-check.component.css']
})
export class LicenseEligibilityCheckComponent implements OnInit {

  preEligible: boolean = false;  // true if first 4 values make user eligible


  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }



  get showGuestPrecheck(): boolean {

    return !this.loginService.currentUser;

  }

}
