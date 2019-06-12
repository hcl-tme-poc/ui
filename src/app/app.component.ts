import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UserModel } from './shared/models/user.model';
import { noUndefined } from '@angular/compiler/src/util';
import { LoginService } from './shared/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  // title = 'dmr-poc';

  constructor(public dialog: MatDialog, public loginService: LoginService, 
        private route: ActivatedRoute, private router: Router,) {}

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

      console.log('dialog closed', response);

      if(response) {
        localStorage.setItem('userToken', JSON.stringify(response));
        // this.loginService.currentUser = response;
        this.loginService.setCurrentUser(response);
      } else {
        localStorage.removeItem('userToken');
      }


    });

  }

  doLogout() {

    localStorage.removeItem('userToken');

    this.loginService.logoff();

  }

  goToDl() {

    this.router.navigate(['/license-aligibility', this.loginService.currentUser ? this.loginService.currentUser : {} ]);

  }

}
