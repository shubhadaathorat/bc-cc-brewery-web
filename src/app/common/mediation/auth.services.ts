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
        let loginResponse = {
        'status': 'success',
        'code': 200,
        'data': {
                'userInfo': {
                'id': 1,
                'name': 'shubhadathorat',
                'emailId': 'shubhadathorat@gmail.com',
                'association': {
                        'id':1,
                        'name': 'East Sussex',
                        'country': 'England'
                    }
                },
                'breweryTypes': [
                    { 'name': 'micro', 'id': '1'},
                    { 'name': 'taproom', 'id': '2'},
                    { 'name': 'brewpub', 'id': '3'}
                ]
            }   
        };
        
        //return this.api.post(url, request)
        return this.api.get('breweries/madtree-brewing-cincinnati')
        .pipe(map((response) => {
                if (loginResponse.status == 'success') {
                    const userDetails = loginResponse?.data?.userInfo;
                    const breweryTypeList = loginResponse?.data?.breweryTypes;
                    this.localStorageSvc.setWithExpiry("User", userDetails, { expireHours: 1 });
                    this.localStorageSvc.setWithExpiry("BreweryTypes", breweryTypeList, { expireHours: 1 });
                }
                return loginResponse;
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