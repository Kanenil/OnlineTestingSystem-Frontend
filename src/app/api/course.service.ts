import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICourseDetailsModel} from "../models/course/course-details.model";
import {ApiRouteKeys} from "../constants/api-routes.constants";
import {ICreateCourseModel} from "../models/course/create-course.model";
import {IEditCourseModel} from "../models/course/edit-course.model";
import {ICourseResultModel} from "../models/course/course-result.model";
import {ICourseRequestModel} from "../models/course/course-request.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(model: ICourseRequestModel) {
    return this.http.get<ICourseResultModel>(`${ApiRouteKeys.Courses.base}`, {
      params: {
        ...model
      }
    });
  }

  getBySlug(slug:string) {
    return this.http.get<ICourseDetailsModel>(`${ApiRouteKeys.Courses.slug}/${slug}`);
  }

  getById(id:string | number) {
    return this.http.get<ICourseDetailsModel>(`${ApiRouteKeys.Courses.id}/${id}`);
  }

  update(model: IEditCourseModel) {
    return this.http.put<any>(`${ApiRouteKeys.Courses.base}`, model)
  }

  join(courseId:string|number) {
    return this.http.post<any>(`${ApiRouteKeys.Courses.join}/${courseId}`, { })
  }

  leave(courseId:string|number) {
    return this.http.post<any>(`${ApiRouteKeys.Courses.leave}/${courseId}`, { })
  }

  create(model:ICreateCourseModel) {
    return this.http.post<any>(`${ApiRouteKeys.Courses.base}`, model);
  }


}
