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

    authID: string;
    
    public listPermission: string[] = []
    public permission = new BehaviorSubject<string[]>([])

    constructor(private localStorageSvc: LocalStorageService,
        private router: Router,
        private api: ApiService) {
        this.authID = environment.globalVarAuthID;
    }

    getPermission() {
        return this.listPermission
    }

    userLogin(request: LoginRequest) {
        let url = urls.login
        return this.api.post(url, request)
            .pipe(
                map((response) => {
                    if (response.jwToken && response.jwToken.length > 0) {
                        const user = response.data
                        this.localStorageSvc.setWithExpiry(this.authID, response.jwToken, { expireHours: 1 });
                        this.localStorageSvc.setWithExpiry("User", { id: user.id, roleId: user.roleId.id }, { expireHours: 1 });
                        this.listPermission = user.roleId.accessLayerModule.split('|')
                        this.permission.next(this.listPermission)
                    }
                    return response;
                })
            );

    }

    userLogout() {
        this.localStorageSvc.removeItem(environment.globalVarAuthID);
        this.localStorageSvc.removeItem(environment.globalMcSession);
        this.localStorageSvc.removeItem('User');
        this.listPermission = []
        this.permission.next(this.listPermission)
        this.router.navigate(['/login'], { queryParamsHandling: 'merge' });
    }

    isLoggedIn() {
        return this.localStorageSvc.getWithExpiry(environment.globalVarAuthID) ? true : false;
    }

}