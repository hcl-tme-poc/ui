import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, 
          private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {

    this.loginForm = this.initLoginForm();
  }

  onSubmit() {
    console.log('form submitted', this.loginForm.value);

    this.loginService.login(this.loginForm.value)
      .subscribe(
        (val) => {
          console.log('token', val);
          this.dialogRef.close(val);
        },
        (err) => {
          console.log('error', err);
        }
      );
  }

  get loginIdControl() { 
    return this.loginForm.get('loginId'); 
  }

  get passwordControl() { 
    return this.loginForm.get('password'); 
  }


  private initLoginForm(): FormGroup {

    return this.fb.group({
      loginId:  ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });

  }

}
