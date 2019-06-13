import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserModel, UserEligibilityState } from '../shared/models/user.model';
import { EligibilityCheckService } from './eligibility-check.service';

@Component({
  selector: 'app-license-eligibility-check',
  templateUrl: './license-eligibility-check.component.html',
  styleUrls: ['./license-eligibility-check.component.css']
})
export class LicenseEligibilityCheckComponent implements OnInit {

  preEligible: boolean = false;  // true if first 4 values make user eligible

  componentState: UserEligibilityState | {pricheck: boolean};

  currentUser: UserModel | {} = {};


  constructor(public loginService: LoginService, private eligibilityCheckService: EligibilityCheckService,
          private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    console.log(' ****************** in onInit');

    this.route.paramMap.pipe(
      tap(val => {
        // console.log(' ********** route.paramMap',  val['params'].pricheck);
      })
    ).subscribe((params) => {
      this.componentState = params['params'];
      this.componentState = {...this.componentState, pricheck: this.componentState.pricheck === 'true'}
    });

    this.loginService.currentUser$.subscribe(user => {

      console.log(' *** currentUser$ changed');

      this.currentUser = user;

    });

  }

  ngAfterViewInit() {

  }


  ngOnChanges(changeRecord) {

  }

  doPreCheck(event) {

    console.log('in doPreCheck', event);

    // console.log('this.route.snapshot', this.route.snapshot.routeConfig.path);

    // this.router.navigate([this.route.snapshot.routeConfig.path, event]);

    this.eligibilityCheckService.preCheckDriver(event.driverLicenseNumber, event.trilliumNumber,
            event.postalCode, event.dob).subscribe()


  }

  get showGuestPrecheck(): boolean {

    // return ! this.currentUser.hasOwnProperty('token');

    // console.log('this.componentState.pricheck', !this.componentState['pricheck']);

    return !this.componentState.pricheck;

  }

}
