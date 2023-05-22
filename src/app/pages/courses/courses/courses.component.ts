import {Component} from '@angular/core';
import {ICourseDetailsModel} from "../../../models/course/course-details.model";
import {CourseService} from "../../../api/course.service";
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {AccountService} from "../../../api/account.service";
import {LocalStorageKeys} from "../../../constants/local-storage.constants";
import {EventBusService} from "../../../shared/event-bus.service";
import {EventNameKeys} from "../../../constants/event-names.constants";
import {ModalService} from "../../../services/modal.service";
import {CreateCourseComponent} from "../../../components/modal/create-course/create-course.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent {
  isLoading = false;
  loginedUser: IExtendedUserModel | null = null;
  courses: ICourseDetailsModel[] = [];

  constructor(
    private courseService: CourseService,
    private accountService: AccountService,
    private eventBusService: EventBusService,
    private modalService: ModalService
  ) {
    this.loadUser();
    this.isLoading = true;
    this.courseService.getAll().subscribe(courses => {
      this.courses = courses;
      this.isLoading = false;
    })
    this.eventBusService.on(EventNameKeys.Authorize, ()=>{
      this.loadUser();
    })
  }

  private loadUser() {
    if(localStorage.getItem(LocalStorageKeys.Tokens))
      this.accountService.profile().subscribe(user=>{
        this.loginedUser = user;
      })
    else
      this.loginedUser = null;
  }

  createOwnCourseShow() {
    this.modalService.show(CreateCourseComponent);
  }

}
