import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IExtendedUserModel} from "../models/user/extended-user.model";
import {ApiRouteKeys} from "../constants/api-routes.constants";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  upload(file : FormData) {
    return this.http.post<{ fileUrl:string }>(ApiRouteKeys.Upload.upload, file);
  }
}
