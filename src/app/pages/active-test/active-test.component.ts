import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../api/course.service";
import {ITestModel} from "../../models/test/test.model";
import {IQuestionModel} from "../../models/test/question/question.model";
import {IAnswerModel} from "../../models/test/answer/answer.model";

@Component({
  selector: 'app-active-test',
  templateUrl: './active-test.component.html'
})
export class ActiveTestComponent implements OnInit {

  public currentQuestion: number = 0;
  public questionList: IQuestionModel[] = [];
  public isTestCompleted: boolean = false;
  private selectedOptions: IAnswerModel[] = [];

  public slug: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let slug = params['0']
      let id = params['1']

      this.slug = slug;

      this.courseService.getBySlug(slug).subscribe(resp=>{
        let test = resp.tests.find(x=>x.id == id) || null;

        if(test !== null) {
          this.questionList = test.questions;
        } else {
          this.router.navigate(['/courses', resp.slug], {replaceUrl: true});
        }
      }, error => {this.router.navigate(['/not-found'],{replaceUrl: true})})
    })
  }

  correctAnswers() {
    return this.selectedOptions.filter(x=>x.isCorrect);
  }

  answer(option: IAnswerModel) {
    if(this.currentQuestion === this.questionList.length - 1){
      this.isTestCompleted = true;
    }

    this.selectedOptions.push(option);
    this.currentQuestion++;
  }

}
