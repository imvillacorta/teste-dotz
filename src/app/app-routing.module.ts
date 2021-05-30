import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./pages/login/login.component";
import { AutoCadastroComponent } from "./pages/auto-cadastro/auto-cadastro.component";
import { MeusPedidosComponent } from "./pages/meus-pedidos/meus-pedidos.component";
import { ProdutosComponent } from "./pages/produtos/produtos.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'auto-cadastro',
    component: AutoCadastroComponent,
  },
  {
    path: 'meus-pedidos',
    component: MeusPedidosComponent,
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
