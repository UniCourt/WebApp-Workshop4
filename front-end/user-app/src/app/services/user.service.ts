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
    let loggedInUserId = this.authService.loggedInUser.id;
  }

  getUserDetail(id: number): Observable<any> {
    let loggedInUserId = this.authService.loggedInUser.id || 1;
    return this.http.get(this.baseUrl + '/contact/getUserById' + `?userId=${loggedInUserId}&contactId=${id}`);
  }

  addUser(user): void {
    let loggedInUserId = this.authService.loggedInUser;
    user['userId']=loggedInUserId.id;
  }

  deleteUser(id: number): void {
    let loggedInUserId = this.authService.loggedInUser.id;
    
  }
}
