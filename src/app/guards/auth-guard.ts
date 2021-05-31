import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    
    let idUsuario = localStorage.getItem('user');
    //SE USUARIO ESTIVER LOGADO ELE TEM ACESSO AS PAGINAS
    if (idUsuario) {
      return true;
    }

    //SE NÃO ESTIVER LOGADO
    this.router.navigate(['/login']);
    return false;
  }
}
