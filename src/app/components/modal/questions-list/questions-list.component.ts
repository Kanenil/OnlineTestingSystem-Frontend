import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../api/course.service";
import {ModalService} from "../../../services/modal.service";
import {Router} from "@angular/router";
import {ITestModel} from "../../../models/test/test.model";
import {CreateQuestionComponent} from "../create-question/create-question.component";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html'
})
export class QuestionsListComponent implements OnInit {

  // @ts-ignore
  private course: ICourseDetailsModel;
  // @ts-ignore
  public test: ITestModel;

  constructor(
    private courseService: CourseService,
    public modalService: ModalService,
    private router: Router
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
  }

  createQuestion() {
    this.modalService.show(CreateQuestionComponent);
  }
}
