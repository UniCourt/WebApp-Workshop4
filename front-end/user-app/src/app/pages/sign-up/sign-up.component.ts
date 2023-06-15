import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  loginFormBuilder: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) {
    this.loginFormBuilder = this.formBuilder.group({
      username: formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: formBuilder.control('', [Validators.required]),
      confirmPassword: formBuilder.control('', [Validators.required]),
    });
  }
}
