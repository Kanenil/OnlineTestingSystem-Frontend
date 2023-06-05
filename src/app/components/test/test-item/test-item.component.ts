import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ITestModel} from "../../../models/test/test.model";
import {ICourseDetailsModel} from "../../../models/course/course-details.model";

@Component({
  selector: 'app-test-item',
  templateUrl: './test-item.component.html'
})
export class TestItemComponent implements OnChanges {
  // @ts-ignore
  @Input() test: ITestModel;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['test'].currentValue) {
      this.test = changes['test'].currentValue;
    }
  }
}
