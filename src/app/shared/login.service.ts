import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './models/login.model';
import { of, Observable, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginModel): Observable<any> {

    if(loginInfo.loginId === loginInfo.password) {
      return of('toooooken').pipe(
        delay(1000)
      );
    }else {
      return throwError('This is an error!');
    }

  }
}
