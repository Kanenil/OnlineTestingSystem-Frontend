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
import {CropperModule} from "../components/cropper/cropper.module";
import {PaginationModule} from "../components/pagination/pagination.module";
import {BaseModule} from "../components/common/base.module";
import {TestComponent} from "./courses/test/test.component";
import {TestModule} from "../components/test/test.module";
import { ActiveTestComponent } from './active-test/active-test.component';

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
    TestComponent,
    ActiveTestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CourseModule,
    GoogleSigninModule,
    CropperModule,
    PaginationModule,
    BaseModule,
    TestModule
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
