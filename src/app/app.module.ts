import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

//MODULOS DE TERCEIROS
import { NgxMaskModule, IConfig } from 'ngx-mask';

//MODULOS INTERNOS
import { ComponentsModule } from "./components/components.module";

//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AutoCadastroComponent } from './pages/auto-cadastro/auto-cadastro.component';
import { MeusPedidosComponent } from './pages/meus-pedidos/meus-pedidos.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { AuthGuard } from './guards/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AutoCadastroComponent,
    MeusPedidosComponent,
    ProdutosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
