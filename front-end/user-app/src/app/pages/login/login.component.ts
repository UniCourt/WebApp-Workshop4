import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  // isLogedIn: boolean = false;

  constructor(private readonly formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: formBuilder.control('', [Validators.required,Validators.email]),
      password: formBuilder.control('', [Validators.required]),
    });
  }

  async onSubmit(){
    if(this.loginForm.valid){
      // let logedInUser = await this.authService.login(this.loginForm.value)
      // this.router.navigateByUrl('/dashboard');
      await this.authService.login(this.loginForm.value)
      .then(
        (response:any)=>{
          console.log(response);
          if(response){
            localStorage.setItem('jwt', response.Authorization);
            this.authService.setLogedInUser();
            this.router.navigateByUrl('/dashboard');
          }else{
            alert("Invalid email id password");
          }
          
        },(error)=>{
          console.log(error);
          
        }
      );
    }
  }

}
