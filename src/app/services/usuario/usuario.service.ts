import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  criar(usuario: any) {
    return this.http.post<any>(
      `${environment.urlApi}/usuarios`,
      {
        nome: usuario.value.nome,
        cpf: usuario.value.cpf,
        email: usuario.value.email,
        saldo: 0,
        endereco: [
          {
            cep: usuario.value.cep,
            rua: usuario.value.endereco,
            numero: usuario.value.numero,
            complemento: usuario.value.complemento,
            bairro: usuario.value.bairro,
            cidade: usuario.value.cidade,
            estado: usuario.value.estado
          }
        ],
        produtos: []
      }
    );
  }

}
