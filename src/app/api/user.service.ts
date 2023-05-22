import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IExtendedUserModel} from "../models/user/extended-user.model";
import {ApiRouteKeys} from "../constants/api-routes.constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getById(id:string|number) {
    return this.http.get<IExtendedUserModel>(`${ApiRouteKeys.Users.id}/${id}`);
  }

  getBySlug(slug:string) {
    return this.http.get<IExtendedUserModel>(`${ApiRouteKeys.Users.slug}/${slug}`);
  }

}
