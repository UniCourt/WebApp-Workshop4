import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
  })
export class AuthService {

  constructor(private http: HttpClient, private router: Router){
    this.setLogedInUser();
  }

  baseUrl: string = 'http://localhost:3007';
  public loggedInUser = {
    id: null,
    emailId: null
  };

  async register(data:any){
    delete data.confirmPassword;
    console.log(data);
    
    let returnedData = this.http.post(this.baseUrl+"/auth/register",data).subscribe({
      next(res:any){
        console.log(res);
        if(res.success){
          return res;
        }
      },
      error(err){
        console.log(err);
      }
    })
    if(returnedData){
      alert('User registered successfully!');
      this.router.navigateByUrl('/login');
    }
    console.log(returnedData);
    
  }

  async login(data:any){
    console.log(data);
    let returnedData:any = await this.http.post(this.baseUrl+'/auth/login',data).subscribe({
      next(res:any){
        console.log(res);
        console.log(res.Authorization);
        localStorage.setItem('jwt', res.Authorization);
        return res.data;
      },
      error(err){
        console.log(err);

      }
    })
    console.log(await returnedData);
    
    if(!returnedData){
      alert("Invalid username or password");
      return;
    } else{
      this.router.navigateByUrl('/dashboard')
    }
    console.log(returnedData);
    
    // localStorage.setItem('jwt', returnedData.Authorization);
    // this.router.navigateByUrl('/dashboard');
    
  }

  getAuthToken():string {
    let token =  localStorage.getItem('jwt');
    return token;
  }

  setLogedInUser(){
    let token =  localStorage.getItem('jwt')
    if(token){
      let decodedToken:any = jwt_decode(token);
      console.log(decodedToken);
      this.loggedInUser['emailId'] = decodedToken?.userEmailId;
      this.loggedInUser['id']= decodedToken.userId;
    }
    
  }
}