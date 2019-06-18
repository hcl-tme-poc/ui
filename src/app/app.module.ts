import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { TextMaskModule } from 'angular2-text-mask';

import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher, ErrorStateMatcher } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NotImplimentedComponent } from './not-implimented/not-implimented.component';
import { LicenseEligibilityCheckComponent } from './license-eligibility-check/license-eligibility-check.component';
import { GuestPrecheckComponent } from './license-eligibility-check/guest-precheck/guest-precheck.component';
import { QuestionerComponent } from './license-eligibility-check/questioner/questioner.component';
import { ReportComponent } from './license-eligibility-check/report/report.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: NotImplimentedComponent },
  { path: 'license-eligibility', component: LicenseEligibilityCheckComponent },
  { path: 'license-eligibility-report', component: ReportComponent },
  
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotImplimentedComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginDialogComponent,
    NotImplimentedComponent,
    LicenseEligibilityCheckComponent,
    GuestPrecheckComponent,
    QuestionerComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false, useHash: true }),
  ],
  entryComponents: [
    LoginDialogComponent,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
