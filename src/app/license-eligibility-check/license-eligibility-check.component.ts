import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserModel } from '../shared/models/user.model';

@Component({
  selector: 'app-license-eligibility-check',
  templateUrl: './license-eligibility-check.component.html',
  styleUrls: ['./license-eligibility-check.component.css']
})
export class LicenseEligibilityCheckComponent implements OnInit {

  preEligible: boolean = false;  // true if first 4 values make user eligible

  currentUser: UserModel | {} = {};


  constructor(public loginService: LoginService, 
          private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.paramMap.pipe(
      tap(val => console.log(' ********** current user', val))
    ).subscribe();

    this.loginService.currentUser$.subscribe(user => {

      console.log(' *********** current user', user);

      this.currentUser = user;

    });

  }

  ngAfterViewInit() {

    // this.loginService.currentUser$.subscribe(user => {

    //   console.log(' *********** current user', user);

    //   this.currentUser = user;

    // });

  }


  ngOnChanges(changeRecord) {

    console.log(' ************** something changed', changeRecord);


  }

  doPreCheck(event) {

    // console.log('in doPreCheck', event);

    // console.log('this.route.snapshot', this.route.snapshot.routeConfig.path);

    // this.router.navigate([this.route.snapshot.routeConfig.path, event]);


  }

  get showGuestPrecheck(): boolean {

    // return !this.loginService.currentUser;

    // console.log(' *** in showGuestPrecheck. return ', this.currentUser == {}, '  this.currentUser', this.currentUser);

    return ! this.currentUser.hasOwnProperty('token');

  }

}
