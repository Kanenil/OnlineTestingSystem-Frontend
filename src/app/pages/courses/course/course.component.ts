import {Component} from '@angular/core';
import {ICourseDetailsModel} from "../../../models/course/course-details.model";
import {IRoleModel} from "../../../models/role.model";
import {IUserModel} from "../../../models/user/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../../api/course.service";
import {AccountService} from "../../../api/account.service";
import {Title} from "@angular/platform-browser";
import {LocalStorageKeys} from "../../../constants/local-storage.constants";
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {EventBusService} from "../../../shared/event-bus.service";
import {EventNameKeys} from "../../../constants/event-names.constants";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent {
  course: ICourseDetailsModel | null = null;
  isLoading = false;
  isInCourse = false;
  loginedUser: IExtendedUserModel | null = null;
  // @ts-ignore
  owner: { role: IRoleModel; user: IUserModel };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    public accountService: AccountService,
    private titleService: Title,
    private eventBusService: EventBusService,
    private notifyService: NotificationService,
  ) {
    eventBusService.on(EventNameKeys.Authorize, ()=>{
      this.loadUser();
    })
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.loadCourse(slug);
    })
  }

  private loadCourse(slug: string | null) {
    if (slug) {
      this.isLoading = true;
      this.courseService.getBySlug(slug).subscribe(course => {
        this.course = course;
        this.isLoading = false;
        this.owner = this.course.users.filter(value => value.role.name === "Owner")[0];

        if (localStorage.getItem(LocalStorageKeys.Tokens)) {
          this.accountService.profile().subscribe(user => {
            this.loginedUser = user;
            if (user && user.courses.length > 0) {
              this.isInCourse = !!user.courses.find(value => value.course.id == course.id);
            } else {
              this.isInCourse = false;
            }
          })
        }
        this.titleService.setTitle(`${this.course.name} - Smart Test`)
      },error => {
        if(error.status === 404)
          this.router.navigate(['/not-found']);
      })
    }
  }

  private loadUser() {
    if(localStorage.getItem(LocalStorageKeys.Tokens))
      this.accountService.profile().subscribe(user => {
        this.loginedUser = user;
      })
    else{
      this.loginedUser = null;
      this.isInCourse = false;
    }
  }

  joinCourse() {
    if (this.course) {
      this.courseService.join(this.course.id).subscribe(() => {
        this.isInCourse = true;
        this.loadUser();
        this.loadCourse(this.course?.slug||'');
        this.notifyService.showSuccess("You successfully joined to course","Course info");
      })
    }
  }

  leaveCourse() {
    if (this.course) {
      this.courseService.leave(this.course.id).subscribe(() => {
        this.isInCourse = false;
        this.loadUser();
        this.notifyService.showSuccess("You successfully leaved from the course","Course info");
      })
    }
  }

}
