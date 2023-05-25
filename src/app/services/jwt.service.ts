import { Injectable } from '@angular/core';
import {ITokenUserModel} from "../models/token-user.model";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeGoogle(token:string) {
    const decoded = this.decodeToken(token);
    return decoded?decoded.id:null;
  }

  private decodeToken(token: string): any {
    try {
      return jwt_decode<any>(token);
    } catch(Error) {
      return null;
    }
  }
}
