import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: formBuilder.control('', [Validators.required,Validators.email]),
      password: formBuilder.control('', [Validators.required]),
    });
  }

  async onSubmit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value);
    }
  }

}
