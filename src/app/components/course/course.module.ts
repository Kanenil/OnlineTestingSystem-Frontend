import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course-item/course-item.component';
import {RouterLink} from "@angular/router";
import {TruncatePipe} from "../../pipes/truncate.pipe";
import { CourseItemSkeletonComponent } from './course-item-skeleton/course-item-skeleton.component';
import { UserCourseItemComponent } from './user-course-item/user-course-item.component';

@NgModule({
  declarations: [
    CourseItemComponent,
    CourseItemSkeletonComponent,
    UserCourseItemComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    CourseItemComponent,
    CourseItemSkeletonComponent,
    UserCourseItemComponent
  ]
})
export class CourseModule { }
