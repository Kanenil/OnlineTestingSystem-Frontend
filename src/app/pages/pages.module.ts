import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { GoogleFinishComponent } from './auth/google-finish/google-finish.component';
import {CourseModule} from "../components/course/course.module";
import { UserComponent } from './profile/user/user.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { CourseComponent } from './courses/course/course.component';
import { SettingsComponent } from './profile/settings/settings.component';
import {GoogleSigninModule} from "../components/google-signin/google-signin.module";

@NgModule({
  declarations: [
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GoogleFinishComponent,
    UserComponent,
    CoursesComponent,
    CourseComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CourseModule,
    GoogleSigninModule,
  ],
  exports: [
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GoogleFinishComponent,
    UserComponent,
  ],
})
export class PagesModule { }
