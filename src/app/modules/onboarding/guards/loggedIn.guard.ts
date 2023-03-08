import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BaseGuard } from 'src/app/common/guard/base.guard';
import { AuthService } from 'src/app/common/mediation/auth.services';

@Injectable()
export class LoggedInGuard extends BaseGuard {

    constructor(router: Router, private authService: AuthService) {
        super(router);
    }

    isFalseNavigateToRoute(route) {
        return 100;
    }

    isValid(route: ActivatedRouteSnapshot) {
        if (this.authService.isLoggedIn()) {
            this.navigateToDashBoard();
            return true;
        }
        return true;
    }

    private navigateToDashBoard() {
        this.router.navigate(['/'], { queryParamsHandling: 'merge' });
    }
}
