import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SpinnerService } from '../../common/spinner/service/spinner.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private count = 0;
  private spinType: string;
  private cloned;
  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.count++;
    this.spinType = req.headers.get('CustomSpinner') ? 'sub' : 'main';
    if (this.count === 1) {
      this.spinnerService.show(this.spinType);
    }
    const handleObs: Observable<HttpEvent<any>> = next.handle(req);
    return handleObs
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.decreaseRequestCount();
          }
        }),
        catchError((error, caught) => {
          this.decreaseRequestCount();
          return throwError(error);
        })
      );
  }

  decreaseRequestCount() {
    this.count--;
    if (this.count === 0) {
      this.spinnerService.hide();
    }
  }
}
