import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BaseGuard } from 'src/app/common/guard/base.guard';
import { AuthService } from '../mediation/auth.services';

@Injectable()
export class AuthGuard extends BaseGuard {

    constructor(router: Router,private authService: AuthService) {
        super(router);
    }

    isFalseNavigateToRoute(route) {
        return 100;
    }

    isValid(route: ActivatedRouteSnapshot) {
        if (!this.authService.isLoggedIn()) {
            return false;
        }
        return true;
    }

}
