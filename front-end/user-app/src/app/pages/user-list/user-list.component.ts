import { Component } from '@angular/core';
import { User } from 'src/app/model/common.dto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {


  constructor(public userService: UserService,public authService: AuthService) {
    // this.loadContact();
    let loggedInUserId = this.authService.loggedInUser.id;
    console.log(loggedInUserId);
    this.loadContact(loggedInUserId);
    
  }

  ngOnInit() {
    // if(!this.userService.userAleadyAdded())
    // {
      // this.userService.getUsers();
    // }
    // this.loadContact();

  }
  async loadContact(userId){
    // let loggedInUserId = 1
    // console.log(loggedInUserId);
    
    await this.userService.getContacts(userId);
  }

  deleteUser(event) {
    this.userService.deleteUser(event)
  }


}
