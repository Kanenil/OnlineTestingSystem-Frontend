import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiRouteKeys} from "../constants/api-routes.constants";
import {ITestUpdateModel} from "../models/test/test-update.model";
import {ITestModel} from "../models/test/test.model";
import {ITestCreateModel} from "../models/test/test-create.model";
import {IBaseResponseModel} from "../models/base-response.model";

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
}
