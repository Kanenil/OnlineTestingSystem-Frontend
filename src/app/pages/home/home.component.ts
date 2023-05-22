import {Component} from '@angular/core';
import {ICourseDetailsModel} from "../../models/course/course-details.model";
import {CourseService} from "../../api/course.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  isLoading = false;
  courses :ICourseDetailsModel[] = [];

  constructor(
    private coursesService: CourseService
  ) {
    this.isLoading = true
    coursesService.getAll().subscribe(courses=>{
      this.courses = courses;
      this.isLoading = false;
    })
  }

}
