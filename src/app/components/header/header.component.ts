import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() usuario: any;
  @Input() saldo: any;


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sair() {

    Swal.fire({
      icon: 'question',
      text: "Deseja sair do Programa de Fidelidade Dotz?",
      confirmButtonText: 'SIM',
      confirmButtonColor: '#f29433',
      cancelButtonColor: '#bb2d3b',
      cancelButtonText: 'NÃO',
      showCancelButton: true,
      reverseButtons: true,
      allowOutsideClick: false,
      customClass: {
        confirmButton: 'btn-alert'
      }
    }).then((result) => {
      if (result.dismiss) {
      }
      else {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }

  pedidos() {
    this.router.navigate(['/meus-pedidos']);
  }

}
