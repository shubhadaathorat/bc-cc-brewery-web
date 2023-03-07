import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {CustomHttpModule} from '../http/custom-http.module';
import { CodeChallengeCommonModule } from '../common/code-challenge-common.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

/**
 * Position all feature modules ahead of AppRouting Module.
 *  - This is required to ensure that the Catch-all/ wildcard routes work correctly.
 */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CustomHttpModule,
    CodeChallengeCommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
