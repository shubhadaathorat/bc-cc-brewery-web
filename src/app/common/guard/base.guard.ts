import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseGuard implements CanActivate {
    constructor(public router: Router) { }
    abstract isValid(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    abstract isFalseNavigateToRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<number | UrlTree> | Promise<number | UrlTree> | number | UrlTree;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (this.isValid(route, state)) {
            return Promise.resolve(true);
        } else {
            let routeCode = this.isFalseNavigateToRoute(route, state);
            if (routeCode === 100) {
                this.navigateToHome();
            } else {
                this.navigateToNotFoundPage();
            }
            return Promise.resolve(false);
        }
    }

    private navigateToNotFoundPage() {
        this.router.navigate(['/not-found'], {queryParamsHandling: 'merge'});
    }

    private navigateToHome() {
        this.router.navigate(['/home'], {queryParamsHandling: 'merge'});
    }
}
