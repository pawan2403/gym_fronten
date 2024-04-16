import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthserviceService } from '../Services/authservice.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private service: AuthserviceService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.service.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
    // return next.handle(req).pipe(

    //   catchError((error: any) => {
    //     console.log('errrrrrjwtttttt====', error)
    //     if (error.error.message == 'jwt expired') {
    //       // Token expired or unauthorized
    //       this.service.isLogOut();
    //       this.router.navigate(['signin'])
    //     }
    //     return throwError(error);
    //   })
    // );
  }
}