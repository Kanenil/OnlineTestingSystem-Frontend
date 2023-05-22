import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ICourseDetailsModel} from "../../../models/course/course-details.model";
import {IRoleModel} from "../../../models/role.model";
import {IUserModel} from "../../../models/user/user.model";

@Component({
  selector: 'course-item-card',
  templateUrl: './course-item.component.html'
})
export class CourseItemComponent implements OnChanges {

  // @ts-ignore
  @Input() course: ICourseDetailsModel;

  // @ts-ignore
  owner: { role: IRoleModel; user: IUserModel };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course'].currentValue) {
      this.course = changes['course'].currentValue;
      this.owner = this.course.users.filter(value=>value.role.name === "Owner")[0];
    }
  }

}
