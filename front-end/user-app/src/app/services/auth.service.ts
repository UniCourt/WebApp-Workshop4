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
        if(res.success){
          return res;
        }
      },
      error(err: any){
        console.log(err);
      }
    });

    if(returnedData){
      alert('User registered successfully!');
      this.router.navigateByUrl('/login');
    }
    
  }

  async login(data: any){
    return await this.http.post(this.baseUrl+'/auth/login',data).toPromise()
  }

  logout() {
    // Delete the jwt-token stored in local-storage.
    localStorage.removeItem('jwt');
    // Set the Loged in user data to null.
    this.setLogedInUser();
    // Redirect the user to login page.
    window.location.href = '/login';
  } 

  getAuthToken():string {
    // Retrieve the jwt-token stored in local-storage and return it.
    let token =  localStorage.getItem('jwt');
    return token;
  }

  public setLogedInUser(){
    console.log("setting loged in user");
    // Retrieve the jwt-token stored in local-storage
    let token =  localStorage.getItem('jwt')
    if(token){
      // If token available
      // Decode the token to retirive the encoded email-id & user-id
      let decodedToken:any = jwt_decode(token);
      console.log(decodedToken);
      // Set the loged in user data.
      this.loggedInUser['firstName']=decodedToken?.firstName;
      this.loggedInUser['emailId'] = decodedToken?.userEmailId;
      this.loggedInUser['id']= decodedToken.userId;
    } else{
      // If token not available.
      // Set the loged in user data as null.
      this.loggedInUser['emailId'] = null;
      this.loggedInUser['id']= null;
    }
    
  }

  getTokenExpirationDate(token: string): Date | null {
    // Decode the token.
    const decoded:any = jwt_decode(token);
    console.log(decoded);
    // If the decoded token has expiration time.
    if (decoded && decoded.exp) {
      // Convert expiration in miliseconds to date-tinme
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decoded.exp);
      return expirationDate;
    }

    return null; // Token does not contain an expiration date
  }

  isTokenExpired(token: string): boolean {
    // Return True if Current Date timestamp is greater then Token Expiration timestamp. else return False.
    const expirationDate = this.getTokenExpirationDate(token);
    if (!expirationDate) return false;
    console.log(expirationDate);
    
    console.log(expirationDate.getTime());
    
    return Date.now() > expirationDate.getTime();
  }

  isAuthenticated(): boolean {
    // Retrive jwt-token stored in local storage.
    const token = localStorage.getItem('jwt');
    console.log(token);
    // Check if the current token is valid and not expired
    const isValid = token && !this.isTokenExpired(token);
    console.log("isValid: "+isValid);
    
    if (!isValid) {
      // if not valid navigate to '/login'
      this.router.navigate(['/login']);
    }

    return isValid;
  }
}