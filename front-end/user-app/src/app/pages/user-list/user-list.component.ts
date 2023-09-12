import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {


  constructor(public userService: UserService,public authService: AuthService) {
    let loggedInUserId = this.authService.loggedInUser.id;
    this.loadContact(loggedInUserId);
  }

  async loadContact(userId){
    await this.userService.getContacts(userId);
  }

  deleteUser(event) {
    this.userService.deleteUser(event)
  }


}
