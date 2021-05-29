import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

//MODULOS DE TERCEIROS
import { NgxMaskModule, IConfig } from 'ngx-mask';

//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AutoCadastroComponent } from './pages/auto-cadastro/auto-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AutoCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
