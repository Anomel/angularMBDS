import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // ici on utilise le service qui renvoie une promesse qui dit si on est admin ou pas
    return this.authService.isAdmin()
    .then((admin):boolean => {
      if (admin) {
        console.log("Je suis un bon gardien, j'autorise la navigation")
        return true;
      } else {
        console.log("Je suis un méchant gardien, je n'autorise pas la navigation")
        this.router.navigate(["/home"]);
        return false;
      }
    })
  }

}
