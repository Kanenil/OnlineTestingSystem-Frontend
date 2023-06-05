import {ICourseModel} from "./course.model";
import {IRoleModel} from "../role.model";
import {IUserModel} from "../user/user.model";
import {ITestModel} from "../test/test.model";

export interface ICourseDetailsModel extends ICourseModel {
  code: string,
  isDeleted: boolean,
  dateCreated: string,
  isOnlyForCodeAccess: boolean,
  users: [
    {
      role: IRoleModel,
      user: IUserModel
    }
  ],
  tests: ITestModel[]
}
