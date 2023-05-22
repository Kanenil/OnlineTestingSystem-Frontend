import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { GoogleFinishComponent } from './auth/google-finish/google-finish.component';
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {environment} from "../../environments/environment";
import {CourseModule} from "../components/course/course.module";
import { UserComponent } from './profile/user/user.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { CourseComponent } from './courses/course/course.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GoogleFinishComponent,
    UserComponent,
    CoursesComponent,
    CourseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    GoogleSigninButtonModule,
    CourseModule
  ],
  exports: [
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GoogleFinishComponent,
    UserComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId,{
                oneTapEnabled: false,
              }
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
})
export class PagesModule { }
