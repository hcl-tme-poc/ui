import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UsernModel } from './shared/models/user.model';
import { noUndefined } from '@angular/compiler/src/util';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  // title = 'dmr-poc';

  constructor(public dialog: MatDialog, private loginService: LoginService) {}

  ngOnInit(): void {

    if(localStorage.getItem('userToken')) {
      this.loginService.currentUser = JSON.parse(localStorage.getItem('userToken'));
    }else {
      this.loginService.currentUser =  undefined;
    }
    
  }


  doLogin() {

    this.dialog.open(LoginDialogComponent).afterClosed().subscribe(response => {

      console.log('dialog closed', response);

      if(response) {
        localStorage.setItem('userToken', JSON.stringify(response));
        this.loginService.currentUser = response;
      } else {
        localStorage.removeItem('userToken');
      }


    });

  }

  doLogout() {

    localStorage.removeItem('userToken');

    this.loginService.currentUser = undefined;

  }

}
