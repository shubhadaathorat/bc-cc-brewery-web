import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { urls } from '../../common/constants/apiList';

@Injectable()
export class jwttokenInterceptor implements HttpInterceptor {
  
  constructor(public localStorageSvc: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUserId = this.localStorageSvc.getWithExpiry("User")?.data?.id;
    console.log(currentUserId);
    let authReq : HttpRequest<any> = req
    // if(!req.url.endsWith('/login')){      
    //   authReq = req.clone({
    //     headers: req.headers.set('id', currentUserId)
    //   });
    // }
    const handleObs: Observable<HttpEvent<any>> = next.handle(authReq);
    return handleObs
  }
}

