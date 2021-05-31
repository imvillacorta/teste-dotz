import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    private http: HttpClient
  ) { }

  obterProdutos() {
    return this.http.get<any>(
      `${environment.urlApi}/produtos`);
  }

  obterCateforias() {
    return this.http.get<any>(
      `${environment.urlApi}/categorias`);
  }

  atualizarProduto(produto: any) {
    return this.http.put<any>(
      `${environment.urlApi}/produtos/${produto.id}`,
      {
        id: produto.id,
        descricao: produto.descricao,
        img: produto.img,
        valor: produto.valor,
        categoria: produto.categoria,
        resgatado: true
      }
    );
  }

}
