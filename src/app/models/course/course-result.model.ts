import {ICourseDetailsModel} from "./course-details.model";

export interface ICourseResultModel {
  courses: ICourseDetailsModel[],
  pages: number,
  currentPage: number,
  total: number
}
