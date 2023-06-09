import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import {ReactiveFormsModule} from "@angular/forms";
import {GoogleSigninModule} from "../google-signin/google-signin.module";
import { CreateTestComponent } from './create-test/create-test.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import {RouterLink} from "@angular/router";
import { AnswersListComponent } from './answers-list/answers-list.component';
import { CreateAnswerComponent } from './create-answer/create-answer.component';
import {CourseModule} from "../course/course.module";



@NgModule({
  declarations: [
    ModalComponent,
    CreateCourseComponent,
    CreateTestComponent,
    QuestionsListComponent,
    CreateQuestionComponent,
    AnswersListComponent,
    CreateAnswerComponent
  ],
  exports: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleSigninModule,
    RouterLink,
    CourseModule
  ]
})
export class ModalModule { }
