import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiRouteKeys} from "../constants/api-routes.constants";
import {IExtendedUserModel} from "../models/user/extended-user.model";
import {IEditProfileModel} from "../models/account/edit-profile.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  profile() {
    return this.http.get<IExtendedUserModel>(ApiRouteKeys.Account.profile);
  }

  edit(model:IEditProfileModel) {
    return this.http.post<IExtendedUserModel>(ApiRouteKeys.Account.edit, model);
  }

  logout() {
    return this.http.post<any>(ApiRouteKeys.Account.logout, {});
  }
}
