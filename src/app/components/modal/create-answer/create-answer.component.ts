import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ITestModel} from "../../../models/test/test.model";
import {CourseService} from "../../../api/course.service";
import {ModalService} from "../../../services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "../../../api/test.service";
import {NotificationService} from "../../../services/notification.service";
import {QuestionsListComponent} from "../questions-list/questions-list.component";
import {IQuestionModel} from "../../../models/test/question/question.model";
import {AnswersListComponent} from "../answers-list/answers-list.component";

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html'
})
export class CreateAnswerComponent implements OnInit {
  form: FormGroup = new FormGroup({
    text: new FormControl(''),
    isCorrect: new FormControl(false)
  });
  submitted = false;

  // @ts-ignore
  private course: ICourseDetailsModel;
  // @ts-ignore
  public test: ITestModel;
  // @ts-ignore
  public question: IQuestionModel | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    public modalService: ModalService,
    private router: Router,
    private testService: TestService,
    private notifyService: NotificationService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const currentUrl = this.router.url;

    const regex = /\/courses\/([^\/]+)/;
    const match = currentUrl.match(regex);
    const slug = match && match[1];

    const testRegex = /\/tests\/([^\/?]+)/;
    const testMatch = currentUrl.match(testRegex);
    const id = testMatch && testMatch[1];

    this.courseService.getBySlug(slug || '').subscribe(resp => {
        this.course = resp;

        // @ts-ignore
        this.test = this.course.tests.find(x => x.id == id);

        this.route.queryParams.subscribe(params => {
          this.question = this.test.questions.find(x=>x.id == params[0]);
        })

      }, error => {
        this.router.navigate(['/not-found'], {replaceUrl: true})
      }
    )

    this.form = this.formBuilder.group(
      {
        text: ['', [Validators.required]],
        isCorrect: [false],
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

    this.testService.createAnswer({...this.form.value, questionId: this.question?.id}).subscribe(resp=>{
      this.notifyService.showSuccess("Answer successfully created","Answer info");
      this.modalService.show(AnswersListComponent);
    })
  }
}
