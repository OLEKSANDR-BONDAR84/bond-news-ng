import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';

import { LoaderComponent } from './component/loader/loader.component';
import { LoaderService } from './service/loader.service';
import { LoaderInterceptor } from './interceptor/loader.interceptor';

import { AppComponent } from './app.component';
import { TestComponent } from './component/test/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
