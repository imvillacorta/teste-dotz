import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuarioService } from "src/app/services/usuario/usuario.service";

@Component({
  selector: 'app-auto-cadastro',
  templateUrl: './auto-cadastro.component.html',
  styleUrls: ['./auto-cadastro.component.scss']
})
export class AutoCadastroComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: [''],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  get nome() {
    return this.form.get('nome');
  }

  get cpf() {
    return this.form.get('cpf');
  }

  get email() {
    return this.form.get('email');
  }

  get cep() {
    return this.form.get('cep');
  }

  get endereco() {
    return this.form.get('endereco');
  }

  get numero() {
    return this.form.get('numero');
  }

  get complemento() {
    return this.form.get('complemento');
  }

  get bairro() {
    return this.form.get('bairro');
  }

  get cidade() {
    return this.form.get('cidade');
  }

  get estado() {
    return this.form.get('estado');
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.status == 'INVALID') {
      console.log(this.form);
    }

    else {

      this.usuarioService
        .criar(this.form)
        .subscribe(resp => {
          Swal.fire({
            icon: 'success',
            title: 'Conta Criada',
            text: "Sua conta foi gerada com sucesso.",
            confirmButtonText: 'ENTENDI',
            confirmButtonColor: '#f29433',
            allowOutsideClick: false,
            customClass: {
              confirmButton: 'btn-alert'
            }
          }).then((result) => {
            if (result.dismiss) {
            } else {
              this.submitted = false;
              this.form.reset();
              this.router.navigate(['login']);
            }
          });
        }, error => {
          console.log(error);
        })
    }
  }
}
