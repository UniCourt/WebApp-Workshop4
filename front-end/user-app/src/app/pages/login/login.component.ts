import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFormBuilder: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) {
    this.loginFormBuilder = this.formBuilder.group({
      username: formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: formBuilder.control('', [Validators.required]),
    });
  }
}
