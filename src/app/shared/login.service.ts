import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './models/login.model';
import { of, Observable, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UsernModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  allUsers: UsernModel[] = [
    {
      userName: {firstName: 'John', lastName: 'Smith'},
      token: 'aaaaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      userName: {firstName: 'Bob', lastName: 'Jones'},
      token: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    }
  ]

  currentUser: UsernModel | undefined;

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginModel): Observable<any> {

    if(loginInfo.loginId === loginInfo.password) {

      const user = loginInfo.loginId === 'aaa' ? this.allUsers[0] : this.allUsers[1];

      this.currentUser = user;

      return of(user).pipe(
        delay(1000)
      );
    }else {

      this.currentUser = undefined;

      return throwError('Login id or password invalid');
    }

  }

  logoff() {
    
  }
}
