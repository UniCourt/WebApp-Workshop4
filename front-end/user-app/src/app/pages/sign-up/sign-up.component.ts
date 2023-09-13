import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  loginForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      firstName: formBuilder.control('', [Validators.required]),
      lastName: formBuilder.control('', []),
      emailId: formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: formBuilder.control('', [Validators.required]),
      confirmPassword: formBuilder.control('', [Validators.required]),
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.register(this.loginForm.value);
    }
  }
  
}
