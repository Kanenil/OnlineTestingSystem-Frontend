import {Component, OnInit} from '@angular/core';
import {ICourseDetailsModel} from "../../../models/course/course-details.model";
import {ITestModel} from "../../../models/test/test.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../../api/course.service";
import {LocalStorageKeys} from "../../../constants/local-storage.constants";
import {AccountService} from "../../../api/account.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";
import {TestService} from "../../../api/test.service";
import {ModalService} from "../../../services/modal.service";
import {QuestionsListComponent} from "../../../components/modal/questions-list/questions-list.component";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {
  // @ts-ignore
  test : ITestModel
  // @ts-ignore
  course : ICourseDetailsModel
  isOwner: boolean = false;
  isEditing: boolean = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });
  submitted = false;
  routes = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private testService: TestService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      const id = params['id'];

      if (localStorage.getItem(LocalStorageKeys.Tokens)) {
        this.accountService.profile().subscribe(user => {
          this.isOwner = user.courses.find(value => value.course.slug == slug)?.role.name === 'Owner';
        })
      }

      this.courseService.getBySlug(slug).subscribe(resp=>{

        let test = resp.tests.find(x=>x.id == id) || null;

        this.course = resp;

        if(test !== null) {
          this.test = test;
        } else {
          this.router.navigate(['/courses', resp.slug], {replaceUrl: true});
        }

        this.form = this.formBuilder.group(
          {
            name: [test?.name, [Validators.required]],
            description: [test?.description],
          }
        );

        this.routes = [
          // @ts-ignore
          {name:'Courses', link:["/courses"]},
          // @ts-ignore
          {name: resp.name || '', link: ['/courses', slug || '']},
          // @ts-ignore
          {name: test?.name || '', link: ['/courses', slug || '','tests', id || '']},
        ];

      }, error => {
        this.router.navigate(['/not-found'], {replaceUrl: true});
      })
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset() {
    this.isEditing = false;
    this.submitted = false;
    this.form = this.formBuilder.group(
      {
        name: [this.test?.name, [Validators.required]],
        description: [this.test?.description],
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const {value} = this.form;

    if(value.name !== this.test?.name ||
      value.description !== this.test?.description) {
      this.testService.update({
        ...this.form.value,
        id: this.test?.id
      }).subscribe(
        resp => {
          this.notifyService.showSuccess("Test successfully edited","Test info");
          this.test = {...this.test, ...value};

          this.routes = [
            // @ts-ignore
            {name:'Courses', link:["/courses"]},
            // @ts-ignore
            {name: this.course.name || '', link: ['/courses', this.course.slug || '']},
            // @ts-ignore
            {name: this.test.name || '', link: ['/tests', this.test.id || '']},
          ];
        }
      );
    } else {
      this.notifyService.showInfo("Nothing changed","Test info");
    }

    this.submitted = false;
    this.isEditing = false;
  }

  questionEditor() {
    this.modalService.show(QuestionsListComponent);
  }
}
