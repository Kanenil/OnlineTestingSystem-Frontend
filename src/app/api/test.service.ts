import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiRouteKeys} from "../constants/api-routes.constants";
import {ITestUpdateModel} from "../models/test/test-update.model";
import {ITestCreateModel} from "../models/test/test-create.model";
import {IBaseResponseModel} from "../models/base-response.model";
import {IQuestionCreateModel} from "../models/test/question/question-create.model";
import {IAnswerCreateModel} from "../models/test/answer/answer-create.model";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private http: HttpClient
  ) { }

  update(model: ITestUpdateModel) {
    return this.http.put<any>(`${ApiRouteKeys.Tests.base}`, model);
  }

  create(model: ITestCreateModel) {
    return this.http.post<IBaseResponseModel>(`${ApiRouteKeys.Tests.base}`, model);
  }

  createQuestion(model: IQuestionCreateModel) {
    return this.http.post<IBaseResponseModel>(`${ApiRouteKeys.Tests.question}`, model);
  }

  createAnswer(model: IAnswerCreateModel) {
    return this.http.post<IBaseResponseModel>(`${ApiRouteKeys.Tests.answer}`, model);
  }

  removeAnswer(id: number | string) {
    return this.http.delete<any>(`${ApiRouteKeys.Tests.answer}/${id}`);
  }

  removeQuestion(id: number | string) {
    return this.http.delete<any>(`${ApiRouteKeys.Tests.question}/${id}`);
  }

}
