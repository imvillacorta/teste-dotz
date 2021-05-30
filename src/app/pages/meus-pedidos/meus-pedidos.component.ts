import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/services/login/login.service";

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.scss']
})
export class MeusPedidosComponent implements OnInit {

  public usuario: any;
  public endereco: any;
  public pedidos: any;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.obterUsuario();
  }

  obterUsuario() {
    this.loginService
      .obterUsuarioPorId(localStorage.getItem('user'))
      .subscribe(resp => {
        this.usuario = resp;
        this.endereco = resp?.endereco;
        this.pedidos = resp?.produtos;
      })
  }

}
