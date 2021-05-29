import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { LoginService } from "src/app/services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usuario: [null, [Validators.required, Validators.email]]
    });
  }

  get usuario() {
    return this.form.get('usuario');
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.status == 'INVALID') {
      console.log(this.form);
    }

    else {

      this.loginService
        .obterUsuarios()
        .subscribe(resp => {

          let usuarioFiltrado: any;

          if (Array.isArray(resp)) {
            usuarioFiltrado = resp.filter(
              resp => resp.email === this.form.value.usuario
            )
          }

          this.loginService
            .obterUsuarioPorId(usuarioFiltrado[0]?.id)
            .subscribe(resp => {
              localStorage.setItem('user', usuarioFiltrado[0]?.id);
              this.submitted = false;
              this.form.reset();
              this.router.navigate(['/meus-pedidos']);
            }
              , err => {
                Swal.fire({
                  icon: 'error',
                  title: 'Ops!',
                  text: "Esse usuário não existe, por favor crie seu cadastro e obtenha acesso.",
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
                  }
                });
              })
        })
    }
  }
}
