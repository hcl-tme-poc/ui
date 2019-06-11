import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';


const appRoutes: Routes = [
  // { path: 'welcome', component: WelcomeComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'r-light',
  //   component: RLightComponent,
  //   data: { title: 'Heroes List' }
  // },

  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FlexLayoutModule,
    SharedModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false, useHash: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
