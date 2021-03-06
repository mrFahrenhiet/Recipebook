import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor( private authService: AuthService, private router: Router) {}
    // tslint:disable-next-line: max-line-length
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
        return this.authService.user.pipe(take(1), map(user => {
            const isAuth =  !!user;
            if (isAuth) {
                return true;
            } else {
                return this.router.createUrlTree(['/auth']);
            }
        }));
    }
}
