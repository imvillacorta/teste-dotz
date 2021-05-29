import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { LoginService } from "src/app/services/login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  url: any;
  ocultarHeader: any;
  public usuario: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.url = this.activatedRoute?.root?.snapshot?.firstChild?.routeConfig?.path;

      if (this.url === 'login' || this.url === '' || this.url === 'auto-cadastro') {
        this.ocultarHeader = false;
        console.log(this.ocultarHeader);
      }

      else {
        this.ocultarHeader = true;
      }

    });

    this.obterUsuario();
  }

  obterUsuario() {
    this.loginService
      .obterUsuarioPorId(localStorage.getItem('user'))
      .subscribe(resp => {
        this.usuario = resp;
        console.log(this.usuario);
      })
  }

  sair() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  pedidos() {
    this.router.navigate(['/meus-pedidos']);
  }

}
