import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EligibilityCheckService {

  constructor(private http: HttpClient) { }


  preCheckDriver(driverLicenseNumber: string, trilliumNumber: string, postalCode: string, dob: string) {

    // return this.http.get(filename, {responseType: 'text'})

    const URL = 'http://dmr-poc.eastus.cloudapp.azure.com:12001/ELIGIBILITY-CHECK/V1.0/GUEST-DRIVER/ELIGIBILITY-CHECK';

    const options = { params: new HttpParams().append('driverLicenseNumber', driverLicenseNumber)
            .append('trilliumNumber', trilliumNumber).append('postalCode', postalCode)
            .append('dob', dob) };

    return this.http.post(URL, {}, options)
      .pipe(
        catchError((err) => this.handleError(err))
      );

  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}
