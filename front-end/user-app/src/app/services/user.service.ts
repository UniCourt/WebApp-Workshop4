import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { User, UserDetail } from '../model/common.dto';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // baseUrl: string = 'https://jsonplaceholder.typicode.com/users';
  baseUrl: string = 'http://localhost:3007';
  userId: number;
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}

  userAleadyAdded(): boolean {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    return this.users.length == 0 ? false : true;
  }

  async getContacts(id:number) {
    this.users = [];
    console.log(this.authService.loggedInUser);
    let loggedInUserId = this.authService.loggedInUser.id;
    
    
    await this.http.get(this.baseUrl + `/contact/getContact?id=${loggedInUserId}`).subscribe({
      next: (response: any) => {
        console.log(response);
        
        let tempUser = [];
        response.forEach((element) => {
          console.log(element);
          
          let user: User = {
            id: element.id,
            name: element.name,
            city: element.city,
            emailId: element.email,
          };
          tempUser.push(user);
        });

        localStorage.setItem('users', JSON.stringify(tempUser));
        this.users = JSON.parse(localStorage.getItem('users')) || [];
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  getUserDetail(id: number): Observable<any> {
    console.log(id);
    console.log(this.authService.loggedInUser);
    let loggedInUserId = this.authService.loggedInUser.id || 1;
    return this.http.get(this.baseUrl + '/contact/getUserById' + `?userId=${loggedInUserId}&contactId=${id}`);
  }

  addUser(user): void {
    console.log(this.authService.loggedInUser);
    let loggedInUserId = this.authService.loggedInUser.id || 1;
    user['userId']=loggedInUserId;
    console.log(user);
    
    this.http
      .post(this.baseUrl+'/contact/createContact', {
        data: user,
      })
      .subscribe({
        next: (response) => {
          this.users = JSON.parse(localStorage.getItem('users')) || [];
          this.users.push(user);
          localStorage.setItem('users', JSON.stringify(this.users));
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
        // this.users = JSON.parse(localStorage.getItem('users')) || [];
        // this.users = this.users.filter((user) => user['id'] != id);
        // localStorage.setItem('users', JSON.stringify(this.users));
        // this.users = JSON.parse(localStorage.getItem('users')) || [];
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
