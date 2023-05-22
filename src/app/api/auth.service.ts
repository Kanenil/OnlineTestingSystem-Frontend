import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILoginModel} from "../models/auth/login.model";
import {IAuthResponseModel} from "../models/auth/auth-response.model";
import {IRegisterModel} from "../models/auth/register.model";
import {IGoogleLoginModel} from "../models/auth/google-login.model";
import {IGoogleRegisterModel} from "../models/auth/google-register.model";
import {ITokenModel} from "../models/auth/token.model";
import {ApiRouteKeys} from "../constants/api-routes.constants";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(model: ILoginModel) {
    return this.http.post<IAuthResponseModel>(ApiRouteKeys.Auth.login, model);
  }

  register(model: IRegisterModel) {
    return this.http.post<IAuthResponseModel>(ApiRouteKeys.Auth.register, model);
  }

  googleLogin(model: IGoogleLoginModel) {
    return this.http.post<IAuthResponseModel>(ApiRouteKeys.Auth.google.login, model);
  }

  googleRegister(model: IGoogleRegisterModel) {
    return this.http.post<IAuthResponseModel>(ApiRouteKeys.Auth.google.register, model);
  }

  refreshToken(model: ITokenModel) {
    return this.http.post<ITokenModel>(ApiRouteKeys.Auth.refreshToken, model);
  }

}
