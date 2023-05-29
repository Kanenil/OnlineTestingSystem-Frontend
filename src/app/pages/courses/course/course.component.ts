import {Component, OnInit} from '@angular/core';
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
import {convertBase64ToFile} from "../../../utils/converters";
import {UploadService} from "../../../api/upload.service";
import {IEditCourseModel} from "../../../models/course/edit-course.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {
  course: ICourseDetailsModel | null = null;
  isLoading = false;
  isInCourse = false;
  loginedUser: IExtendedUserModel | null = null;
  // @ts-ignore
  owner: { role: IRoleModel; user: IUserModel };
  isEditing = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    section: new FormControl(''),
    isOnlyForCodeAccess: new FormControl(false),
  });
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    public accountService: AccountService,
    private titleService: Title,
    private eventBusService: EventBusService,
    private notifyService: NotificationService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder,
  ) {
    eventBusService.on(EventNameKeys.Authorize, ()=>{
      this.loadUser();
    })
  }

  ngOnInit() {
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

        this.form = this.formBuilder.group(
          {
            name: [this.course?.name, [Validators.required]],
            description: [this.course?.description],
            section: [this.course?.section],
            isOnlyForCodeAccess: [ this.course?.isOnlyForCodeAccess ]
          }
        );
      },error => {
        if(error.status === 404)
          this.router.navigate(['/not-found']);
      })
    }
  }

  changeBackgroundImage(image: any) {
    if(this.course) {
      const file = convertBase64ToFile(image, 'image.jpg');

      let formData:FormData = new FormData();
      formData.append('file', file)

      this.uploadService.upload(formData).subscribe(resp=>{
        const {fileUrl} = resp;
        const editModel:IEditCourseModel = {
          id: this.course!.id,
          name: this.course!.name,
          image: fileUrl,
          description: this.course?.description,
          section: this.course?.section,
          isOnlyForCodeAccess: this.course!.isOnlyForCodeAccess
        };
        this.courseService.update(editModel).subscribe(resp=>{
          this.course!.image = fileUrl;
        })
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

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset() {
    this.isEditing = false;
    this.submitted = false;
    this.form = this.formBuilder.group(
      {
        name: [this.course?.name, [Validators.required]],
        description: [this.course?.description],
        section: [this.course?.section],
        isOnlyForCodeAccess: [ this.course?.isOnlyForCodeAccess ]
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const {value} = this.form;

    if(value.name !== this.course?.name ||
      value.section !== this.course?.section ||
      value.description !== this.course?.description ||
      value.isOnlyForCodeAccess !== this.course?.isOnlyForCodeAccess) {
      this.courseService.update({
        ...this.form.value,
        id: this.course?.id,
        image: this.course?.image
      }).subscribe(
        resp => {
          this.notifyService.showSuccess("Course successfully edited","Course info");
          this.course = {...this.course, ...value};
        }
      );
    } else {
      this.notifyService.showInfo("Nothing changed","Course info");
    }

    this.submitted = false;
    this.isEditing = false;
  }

}
