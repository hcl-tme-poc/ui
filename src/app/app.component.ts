import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UserModel } from './shared/models/user.model';
import { noUndefined } from '@angular/compiler/src/util';
import { LoginService } from './shared/login.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { OnlineService } from './shared/online.service';
import { debug } from 'util';
import { TouchSequence } from 'selenium-webdriver';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  // title = 'dmr-poc';

  fragment: string;

  constructor(public dialog: MatDialog, public loginService: LoginService, 
        public onlineService: OnlineService,
        private route: ActivatedRoute, public router: Router,) {

  }

  ngOnInit(): void {

    if(localStorage.getItem('userToken')) {
      // this.loginService.currentUser = JSON.parse(localStorage.getItem('userToken'));
      this.loginService.setCurrentUser(JSON.parse(localStorage.getItem('userToken')));
    }else {
      // this.loginService.currentUser =  undefined;
      this.loginService.setCurrentUser(undefined);
    }
    
  }


  doLogin() {

    this.dialog.open(LoginDialogComponent).afterClosed().subscribe(response => {

      if(response) {
        localStorage.setItem('userToken', JSON.stringify(response));
        // this.loginService.currentUser = response;
        this.loginService.setCurrentUser(response);
        this.router.navigate(['/']);
      } else {

        // localStorage.removeItem('userToken');

        this.doLogout();
      }

    });

  }

  doLogout() {

    localStorage.removeItem('userToken');

    this.loginService.logoff();

  }

  goToDl() {

    let checkEligibilityParams = {};

    if(this.loginService.currentUser) {
      checkEligibilityParams = {...this.loginService.currentUser, pricheck: false};
      delete checkEligibilityParams['token'];
    }

    this.router.navigate(['/license-eligibility', checkEligibilityParams ]);
  }

}
