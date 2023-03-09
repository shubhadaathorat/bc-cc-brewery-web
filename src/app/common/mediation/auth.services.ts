import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../services/localStorage.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { urls } from '../constants/apiList'
import { ApiService } from '../services/api.service';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest } from '../models/login';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private localStorageSvc: LocalStorageService,
        private router: Router,
        private api: ApiService) {}

    userLogin(request: LoginRequest) {
        let url = urls.login;       
        return this.api.post(url, request)
        .pipe(map((response) => {
                if (response.status == 'success') {
                    const userDetails = response?.data?.userInfo;
                    const breweryTypeList = response?.data?.userInfo?.breweryTypes;
                    this.localStorageSvc.setWithExpiry("User", userDetails, { expireHours: 1 });
                    this.localStorageSvc.setWithExpiry("BreweryTypes", breweryTypeList, { expireHours: 1 });
                }
                return response;
            })
        );
    }

    userLogout() {
        this.localStorageSvc.removeItem('BreweryTypes');
        this.localStorageSvc.removeItem('User');
        this.router.navigate(['/login'], { queryParamsHandling: 'merge' });
    }

    isLoggedIn() {
        return this.localStorageSvc.getWithExpiry('User') ? true : false;
    }
}