import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
// import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  private readonly excludedPaths: string[] = ['/login', '/logout'];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if the request URL matches any of the excluded paths
    for (const path of this.excludedPaths) {
      if (request.url.includes(path)) {
        // If it matches an excluded path, pass the request through without any modification
        return next.handle(request);
      }
    }

    //copy paste the code here
    

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
