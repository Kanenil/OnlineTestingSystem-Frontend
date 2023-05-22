import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../api/auth.service";
import {ITokenModel} from "../models/auth/token.model";
import {LocalStorageKeys} from "../constants/local-storage.constants";
import {EventData} from "../shared/event.class";
import {EventNameKeys} from "../constants/event-names.constants";
import {EventBusService} from "../shared/event-bus.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = this.addHeaders(request);

    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            return this.handle401Error(req, next);
          }

          return throwError(() => err)
        }));
  }

  private addHeaders(request:HttpRequest<any>) {
    const tokens = JSON.parse(localStorage.getItem(LocalStorageKeys.Tokens)||'{}');
    if(tokens as ITokenModel) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      });
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      const tokens = JSON.parse(localStorage.getItem(LocalStorageKeys.Tokens)||'{}');

      return this.authService.refreshToken(tokens)
        .pipe(
          switchMap((resp: ITokenModel) => {
            this.isRefreshing = false;
            localStorage.setItem(LocalStorageKeys.Tokens, JSON.stringify(resp));

            return next.handle(this.addHeaders(request))
          }),
          catchError((error)=>{
            this.isRefreshing = false;

            if (error.status === 401) {
              localStorage.removeItem(LocalStorageKeys.Tokens);
              this.eventBusService.emit(new EventData(EventNameKeys.Authorize, null));
            }

            return throwError(() => error);
          })
        );
    }

    return next.handle(request);
  }
}

export const authInterceptorProviders = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
