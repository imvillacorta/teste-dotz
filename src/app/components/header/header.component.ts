import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  pedidos() {
    this.router.navigate(['/meus-pedidos']);
  }

}
