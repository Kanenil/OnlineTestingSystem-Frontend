import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./interseptors/auth.interceptor";
import {LayoutModule} from "./components/layout/layout.module";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {PagesModule} from "./pages/pages.module";
import {CourseModule} from "./components/course/course.module";
import { TruncatePipe } from './pipes/truncate.pipe';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    PagesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
