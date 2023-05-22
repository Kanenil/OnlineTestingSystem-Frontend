import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {IsSignedInGuard} from "./guards/is-signed-in.guard";
import {GoogleFinishComponent} from "./pages/auth/google-finish/google-finish.component";
import {UserComponent} from "./pages/profile/user/user.component";
import {CoursesComponent} from "./pages/courses/courses/courses.component";
import {CourseComponent} from "./pages/courses/course/course.component";

const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'Home'}},
  {
    path:'auth',
    canActivate: [IsSignedInGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {title: 'Login'}
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {title: 'Register'}
      },
      {
        path: 'google-finish',
        component: GoogleFinishComponent,
        data: {title: 'Finish Google'}
      },
    ]
  },
  {
    path: 'courses',
    children: [
      {
        path: '',
        component: CoursesComponent,
        data: {title: 'Courses'}
      },
      {
        path: ':slug',
        component: CourseComponent,
      },
    ]
  },
  {path: 'profile/:slug', component: UserComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
