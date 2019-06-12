import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './models/login.model';
import { of, Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  allUsers: UserModel[] = [
    {
      userName: {firstName: 'John', lastName: 'Smith'},
      token: 'aaaaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      userName: {firstName: 'Bob', lastName: 'Jones'},
      token: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    }
  ]

  currentUser: UserModel | undefined;
  _currentUser$: BehaviorSubject<UserModel | {}> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginModel): Observable<any> {

    if(loginInfo.loginId === loginInfo.password) {

      const user = loginInfo.loginId === 'aaa' ? this.allUsers[0] : this.allUsers[1];

      this.currentUser = user;
      this._currentUser$.next(user);

      return of(user).pipe(
        delay(1000)
      );
    }else {

      this.currentUser = undefined;
      this._currentUser$.next({});

      return throwError('Login id or password invalid');
    }

  }

  logoff() {

    this.currentUser = undefined;
      this._currentUser$.next({});
    
  }

  setCurrentUser(currentUser: UserModel | undefined) {

    this.currentUser = currentUser;
    this._currentUser$.next(currentUser ? currentUser : {});

  }

  get currentUser$() {
    return this._currentUser$.asObservable();
  }
}
