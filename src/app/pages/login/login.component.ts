import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

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
      console.log(this.form)
    }

    // else {
    //   this.submitted = false;
    //   this.form.reset();
    //   this.router.navigate(['pedidos']);
    // }

  }

}
