import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:3007';
  userId: number;
  users = [];

  constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}

  async getContacts(id:number) {
    this.users = [];
    console.log("Get contacts: " + id);
    let loggedInUserId = this.authService.loggedInUser.id;

    await this.http.get(this.baseUrl + `/contact/getContact?id=${loggedInUserId}`).subscribe({
      next: (response: any) => {
        console.log(response);
        this.users = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUserDetail(id: number): Observable<any> {
    let loggedInUserId = this.authService.loggedInUser.id || 1;
    return this.http.get(this.baseUrl + '/contact/getUserById' + `?userId=${loggedInUserId}&contactId=${id}`);
  }

  addUser(user): void {
    console.log(this.authService.loggedInUser);
    let loggedInUserId = this.authService.loggedInUser;
    user['userId']=loggedInUserId.id;
    console.log(user);
    
    this.http
      .post(this.baseUrl+'/contact/createContact', {
        data: user,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('User added successfully');
          this.router.navigateByUrl('/dashboard');
        },
        error: (error) => {
          console.log('add user error', error);
        },
      });
  }

  deleteUser(id: number): void {
    console.log(this.authService.loggedInUser);
    let loggedInUserId = this.authService.loggedInUser.id;
    this.http.delete(this.baseUrl + '/contact/deleteContact' + `?userId=${loggedInUserId}&contactId=${id}`).subscribe({
      next: (response) => {
        alert('User delete successfully');
        // this.router.navigateByUrl('/dashboard');
        window.location.href= '/dashboard'
      },
      error: (error) => {
        console.log('delete user error', error);
      },
    });
  }
}
