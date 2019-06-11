import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'dmr-poc';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    
  }


  doLogin() {

    this.dialog.open(LoginDialogComponent).afterClosed().subscribe(response => {

      console.log('dialog closed', response);

      if(response) {
        localStorage.setItem('userToken', JSON.stringify(response));
      } else {
        localStorage.removeItem('userToken');
      }


    });



  }

}
