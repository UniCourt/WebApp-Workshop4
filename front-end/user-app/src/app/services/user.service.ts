import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { User, UserDetail } from '../model/common.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'https://jsonplaceholder.typicode.com/users';
  userId: number;
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  userAleadyAdded(): boolean {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    return this.users.length == 0 ? false : true;
  }

  getUsers(): void {
    this.users = [];
    this.http.get(this.baseUrl).subscribe({
      next: (response: any) => {
        let tempUser = [];
        response.forEach((element) => {
          let user: User = {
            id: element.id,
            name: element.name,
            city: element.address.city,
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
    return this.http.get(this.baseUrl + '/' + id);
  }

  addUser(user: UserDetail): void {
    this.http
      .post(this.baseUrl, {
        user: user,
      })
      .subscribe({
        next: (response) => {
          this.users = JSON.parse(localStorage.getItem('users')) || [];
          this.users.push(user);
          localStorage.setItem('users', JSON.stringify(this.users));
          alert('User added successfully');
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.log('add user error', error);
        },
      });
  }

  deleteUser(id: number): void {
    this.http.delete(this.baseUrl + '/' + id).subscribe({
      next: (response) => {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.users = this.users.filter((user) => user['id'] != id);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        alert('User delete successfully');
      },
      error: (error) => {
        console.log('delete user error', error);
      },
    });
  }
}
