import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserModel, UserEligibilityState } from '../shared/models/user.model';
import { EligibilityCheckService } from './eligibility-check.service';
import { ElegibilityCheckResponse } from '../shared/models/elegibility-check-response.model';

@Component({
  selector: 'app-license-eligibility-check',
  templateUrl: './license-eligibility-check.component.html',
  styleUrls: ['./license-eligibility-check.component.css']
})
export class LicenseEligibilityCheckComponent implements OnInit {

  preEligible: boolean = false;  // true if first 4 values make user eligible

  componentState: UserEligibilityState | {pricheck: boolean};

  currentUser: UserModel | {} = {};

  precheckMessage: ElegibilityCheckResponse | undefined;


  constructor(public loginService: LoginService, private eligibilityCheckService: EligibilityCheckService,
          private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.paramMap.pipe(
      tap(val => {
        // console.log(' ********** route.paramMap',  val['params'].pricheck);
      })
    ).subscribe((params) => {
      this.componentState = params['params'];
      this.componentState = {...this.componentState, pricheck: this.componentState.pricheck === 'true'}
    });

    this.loginService.currentUser$.subscribe(user => {

      this.currentUser = user;

    });

  }

  ngAfterViewInit() {

  }


  ngOnChanges(changeRecord) {

  }

  doPreCheck(event) {

    this.preEligible = false;
    this.precheckMessage = undefined;

    this.eligibilityCheckService.preCheckDriver(event.dlNumber, event.triulliumNumber,
            event.postalCode, event.dob).subscribe((res) => {

      this.precheckMessage = res as ElegibilityCheckResponse;

      this.preEligible = this.precheckMessage.message === 'Eligible for License Renewal';

      this.componentState['driverLicenseNumber'] = event.dlNumber;
      this.componentState['trilliumNumber'] = event.triulliumNumber;
      this.componentState['postalCode'] = event.postalCode;
      this.componentState['dob'] = event.dob;

    });

  }

  questionsSubmitted(event) {

    this.eligibilityCheckService.checkEligibilityQuestioner(this.componentState['driverLicenseNumber'],
          'temp@mail.com', this.toTrueFalse(event.musclePain), this.toTrueFalse(event.poorDriving), 
          this.toTrueFalse(event.cardiacProblem),
          this.toTrueFalse(event.respiratoryProblem), this.toTrueFalse(event.eye), 
          this.toTrueFalse(event.hospitalized) )
    .subscribe((val) => {
      // console.log(' ********* eligibility:', val);

      this.router.navigate(['/license-eligibility-report', {
        dl: this.componentState['driverLicenseNumber'],
        trilliumNumber: this.componentState['trilliumNumber'],
        postalCode: this.componentState['postalCode'],
        dob: this.componentState['dob']
      }]);
    });

  }

  private toTrueFalse(val: string): string {
    return val === 'Yes' ? 'true' : 'false';
  }

  driverFormChanged(event) {

    this.preEligible = false;

    this.precheckMessage = undefined;

  }

  get showGuestPrecheck(): boolean {

    return !this.componentState.pricheck;

  }

  // get showGuestQuestioner(): boolean {

  //   return !this.componentState.pricheck;

  // }

}
