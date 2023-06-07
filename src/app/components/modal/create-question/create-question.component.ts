import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../api/course.service";
import {ModalService} from "../../../services/modal.service";
import {Router} from "@angular/router";
import {ITestModel} from "../../../models/test/test.model";
import {TestService} from "../../../api/test.service";
import {NotificationService} from "../../../services/notification.service";
import {QuestionsListComponent} from "../questions-list/questions-list.component";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html'
})
export class CreateQuestionComponent implements OnInit {

  form: FormGroup = new FormGroup({
    text: new FormControl(''),
  });
  submitted = false;

  // @ts-ignore
  private course: ICourseDetailsModel;
  // @ts-ignore
  public test: ITestModel;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    public modalService: ModalService,
    private router: Router,
    private testService: TestService,
    private notifyService: NotificationService
  ) {
  }

  ngOnInit() {
    const currentUrl = this.router.url;

    const regex = /\/courses\/([^\/]+)/;
    const match = currentUrl.match(regex);
    const slug = match && match[1];

    const testRegex = /\/tests\/([^\/]+)/;
    const testMatch = currentUrl.match(testRegex);
    const id = testMatch && testMatch[1];

    this.courseService.getBySlug(slug || '').subscribe(resp => {
        this.course = resp;

        // @ts-ignore
        this.test = this.course.tests.find(x => x.id == id);

      }, error => {
        this.router.navigate(['/not-found'], {replaceUrl: true})
      }
    )

    this.form = this.formBuilder.group(
      {
        text: ['', [Validators.required]],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.testService.createQuestion({...this.form.value, testId: this.test.id}).subscribe(resp=>{
      this.notifyService.showSuccess("Question successfully created","Question info");
      this.modalService.show(QuestionsListComponent);
    })
  }

}
