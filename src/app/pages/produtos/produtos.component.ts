import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/services/login/login.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public usuario: any;

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
      })
  }

  resgatar() {
    Swal.fire({
      icon: 'question',
      title: 'Resgatar Produto',
      text: "Deseja realmente resgatar este produto?",
      confirmButtonText: 'CONFIRMAR',
      confirmButtonColor: '#f29433',
      cancelButtonColor: '#bb2d3b',
      cancelButtonText: 'CANCELAR',
      showCancelButton: true,
      reverseButtons: true,
      allowOutsideClick: false,
      customClass: {
        confirmButton: 'btn-alert'
      }
    }).then((result) => {
      if (result.dismiss) {
        console.log('canceler');
      }
      else {
        console.log('confirmar');
      }
    });
  }
}
