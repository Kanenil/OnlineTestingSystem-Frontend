import {Component, OnInit} from '@angular/core';
import {ICourseDetailsModel} from "../../../models/course/course-details.model";
import {CourseService} from "../../../api/course.service";
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {AccountService} from "../../../api/account.service";
import {LocalStorageKeys} from "../../../constants/local-storage.constants";
import {EventBusService} from "../../../shared/event-bus.service";
import {EventNameKeys} from "../../../constants/event-names.constants";
import {ModalService} from "../../../services/modal.service";
import {CreateCourseComponent} from "../../../components/modal/create-course/create-course.component";
import {ICourseResultModel} from "../../../models/course/course-result.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  isLoading = false;
  loginedUser: IExtendedUserModel | null = null;

  courseResponse: ICourseResultModel | null = null;

  constructor(
    private courseService: CourseService,
    private accountService: AccountService,
    private eventBusService: EventBusService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadUser();
    this.isLoading = true;

    this.eventBusService.on(EventNameKeys.Authorize, () => {
      this.loadUser();
    })
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      // @ts-ignore
      const currentPage = +params.get('currentPage') || 1;
      // @ts-ignore
      const countOnPage = +params.get('countOnPage') || this.COUNT_ITEMS;
      this.courseService.getAll({page: currentPage, countOnPage: countOnPage}).subscribe(resp => {
        this.courseResponse = resp;

        if (resp.pages < currentPage)
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {currentPage: resp.pages, countOnPage},
            queryParamsHandling: 'merge'
          });

        this.isLoading = false;
      })
    });
  }


  pageChanged(newPage: number) {
    this.courseService.getAll({page: newPage, countOnPage: this.COUNT_ITEMS}).subscribe(resp => {
      this.courseResponse = resp;
      this.isLoading = false;
    })
  }

  private loadUser() {
    if (localStorage.getItem(LocalStorageKeys.Tokens))
      this.accountService.profile().subscribe(user => {
        this.loginedUser = user;
      })
    else
      this.loginedUser = null;
  }

  createOwnCourseShow() {
    this.modalService.show(CreateCourseComponent);
  }

  protected readonly COUNT_ITEMS = 6;
}
