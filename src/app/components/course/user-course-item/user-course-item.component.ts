import {Component, Input} from '@angular/core';
import {IRoleModel} from "../../../models/role.model";
import {ICourseModel} from "../../../models/course/course.model";
import {IExtendedUserModel} from "../../../models/user/extended-user.model";

@Component({
  selector: 'user-course-item-card',
  templateUrl: './user-course-item.component.html'
})
export class UserCourseItemComponent {
  // @ts-ignore
  @Input() course: {
    role: IRoleModel,
    course: ICourseModel
  };
  // @ts-ignore
  @Input() user: IExtendedUserModel;
}
