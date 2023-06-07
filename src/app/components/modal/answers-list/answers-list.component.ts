import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModalService} from "../../../services/modal.service";
import {CourseService} from "../../../api/course.service";
import {IQuestionModel} from "../../../models/test/question/question.model";
import {CreateAnswerComponent} from "../create-answer/create-answer.component";
import {TestService} from "../../../api/test.service";

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html'
})
export class AnswersListComponent implements OnInit {
// @ts-ignore
  private course: ICourseDetailsModel;
  // @ts-ignore
  private test: ITestModel;
  // @ts-ignore
  public question: IQuestionModel;

  constructor(
    private courseService: CourseService,
    public modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
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

          // @ts-ignore
          this.question = this.test.questions.find(x => x.id == params[0]);
        })

      }, error => {
        this.router.navigate(['/not-found'], {replaceUrl: true})
      }
    )
  }

  createAnswer() {
    this.modalService.show(CreateAnswerComponent);
  }

  removeAnswer(id: number | string) {
    this.testService.removeAnswer(id).subscribe(()=>{
      this.loadData();
    })
  }
}
