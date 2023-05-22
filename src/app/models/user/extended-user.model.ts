import {IUserModel} from "./user.model";
import {IRoleModel} from "../role.model";
import {ICourseModel} from "../course/course.model";

export interface IExtendedUserModel extends IUserModel {
  backgroundImage: string,
  courses: [
    {
      role: IRoleModel,
      course: ICourseModel
    }
  ]
}
