import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import {ReactiveFormsModule} from "@angular/forms";
import {GoogleSigninModule} from "../google-signin/google-signin.module";



@NgModule({
  declarations: [
    ModalComponent,
    CreateCourseComponent
  ],
  exports: [
    ModalComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GoogleSigninModule
    ]
})
export class ModalModule { }
