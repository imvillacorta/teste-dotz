import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  obterUsuarios() {
    return this.http.get<any>(
      `${environment.urlApi}/usuarios`);
  }

  obterUsuarioPorId(id: any) {
    return this.http.get<any>(
      `${environment.urlApi}/usuarios/${id}`);
  }

}
