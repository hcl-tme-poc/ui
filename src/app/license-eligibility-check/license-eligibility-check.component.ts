import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-license-eligibility-check',
  templateUrl: './license-eligibility-check.component.html',
  styleUrls: ['./license-eligibility-check.component.css']
})
export class LicenseEligibilityCheckComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

}
