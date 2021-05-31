import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/services/login/login.service";
import { UsuarioService } from "src/app/services/usuario/usuario.service";
import { ProdutosService } from "src/app/services/produtos/produtos.service";
import Swal from 'sweetalert2';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public usuario: any;
  public produtosAtualizados: any;
  public produtos: any;
  public categorias: any;
  public categoriaSelecionada: any = '';

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private produtosService: ProdutosService
  ) { }

  ngOnInit(): void {
    this.obterUsuario();
    this.obterCategoriasProdutos();
    this.obterProdutos();
  }

  obterUsuario() {
    this.loginService
      .obterUsuarioPorId(localStorage.getItem('user'))
      .subscribe(resp => {
        this.usuario = resp;
      })
  }

  obterCategoriasProdutos() {
    this.produtosService
      .obterCateforias()
      .subscribe(resp => {
        this.categorias = resp;
      })
  }

  obterProdutos() {
    this.produtosService
      .obterProdutos()
      .subscribe(resp => {
        this.produtos = resp;
        this.loginService
          .obterUsuarioPorId(localStorage.getItem('user'))
          .subscribe((dadosUsuario: any) => {
            this.produtos.map((todosProdutos: any) => {
              dadosUsuario.produtos.map((produtoResgatado: any) => {
                if (todosProdutos.id === produtoResgatado.id) {
                  todosProdutos.resgatado = true;
                }
              })
            })
          })
      })
  }

  filtrarCategoria() {
    this.produtos = this.produtos.filter((produtos: any) => {
      return produtos.categoria == this.categoriaSelecionada
    })

    if (!this.produtos.length) {
      this.produtosService
        .obterProdutos()
        .subscribe(resp => {
          this.produtos = resp;
          this.produtos = this.produtos.filter((produtos: any) => {
            return produtos.categoria == this.categoriaSelecionada
          })
        })
    }

    if (this.categoriaSelecionada === '') {
      this.obterProdutos();
    }

  }

  resgatar(produto: any) {
    if (this.usuario.saldo < produto.valor) {
      Swal.fire({
        icon: 'info',
        title: 'Ops',
        text: "Infelizmente você não tem saldo suficiente para realizar este resgate.",
        confirmButtonText: 'ENTENDI',
        confirmButtonColor: '#f29433',
        allowOutsideClick: false,
        customClass: {
          confirmButton: 'btn-alert'
        }
      }).then((result) => {
        if (result.dismiss) {
        } else {
        }
      });
    }

    else {
      //RECUPERA PRODUTOS RESGATADOS
      let produtos = this.usuario.produtos.map((produtos: any) => {
        return produtos
      })

      //ADICIONA NO ARRAY PRODUTO SELECIONADO
      produtos.push({
        id: produto.id,
        produto: produto.descricao,
        preco: produto.valor,
        dataCompra: new Date()
      })

      //MONTA OBJETO PARA VINCULAR NOVO PRODUTO AO USUARIO LOGADO
      let infoUsuario: any;
      infoUsuario = {
        id: this.usuario.id,
        nome: this.usuario.nome,
        cpf: this.usuario.cpf,
        email: this.usuario.email,
        saldo: this.usuario.saldo - produto.valor,
        endereco: [
          {
            cep: this.usuario.endereco[0].cep,
            rua: this.usuario.endereco[0].rua,
            numero: this.usuario.endereco[0].numero,
            complemento: this.usuario.endereco[0].complemento,
            bairro: this.usuario.endereco[0].bairro,
            cidade: this.usuario.endereco[0].cidade,
            estado: this.usuario.endereco[0].estado,
          }
        ],
        produtos: produtos
      }

      Swal.fire({
        icon: 'question',
        title: 'Confirme o resgate',
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
        }
        else {
          /*
          AO CONFIRMAR ATUALIZA A SITUAÇÃO DO PRODUTO E 
          ATUALIZA OS DADOS DO USUARIO COMO O NOVO PRODUTO
          */
          this.usuarioService
            .atualizar(this.usuario.id, infoUsuario)
            .subscribe(resp => {

              Swal.fire({
                icon: 'success',
                title: 'Produto Resgatado',
                text: "Obrigado, você resgatou este produto.",
                confirmButtonText: 'ENTENDI',
                confirmButtonColor: '#f29433',
                allowOutsideClick: false,
                customClass: {
                  confirmButton: 'btn-alert'
                }
              }).then((result) => {
                if (result.dismiss) {
                }
                else {
                  this.obterUsuario();
                  this.obterProdutos();
                }
              });
            },
              err => {
                Swal.fire({
                  icon: 'error',
                  title: 'Ops!',
                  text: "Algo deu errado com o seu resgate, tento novamente por favor.",
                  confirmButtonText: 'ENTENDI',
                  confirmButtonColor: '#f29433',
                  allowOutsideClick: false,
                  customClass: {
                    confirmButton: 'btn-alert'
                  }
                }).then((result) => {
                  if (result.dismiss) {
                  } else {
                  }
                });
              })
        }
      });
    }
  }
}
