import { Injectable } from '@angular/core';
import {ITokenUserModel} from "../models/token-user.model";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getUserIdFromToken(token:string) {
    const decoded = this.decodeToken(token);
    return decoded?decoded.id:null;
  }

  private decodeToken(token: string): ITokenUserModel | null {
    try {
      return jwt_decode<ITokenUserModel>(token);
    } catch(Error) {
      return null;
    }
  }
}
