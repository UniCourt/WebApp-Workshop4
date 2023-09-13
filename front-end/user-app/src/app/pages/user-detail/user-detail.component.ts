import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  userDetail = {};

  hasError: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.hasError = false;
    this.getUserDetails();
  }

  async getUserDetails(){
    let contactId = await this.userService.userId;
    this.userDetail = await this.userService.getUserDetail(contactId).subscribe({
      next: (response: any) => {
        console.log('user detail response', response);
        this.userDetail['id'] = this.userService.userId,
        this.userDetail['name'] = response.name;
        this.userDetail['emailId'] = response.emailId;
        this.userDetail['phoneNumber'] = response.phoneNumber;
        this.userDetail['city'] = response.city;
        this.userDetail['companyName'] = response.companyName;
        this.userDetail['zipcode'] = response.zipcode;
        this.userDetail['street'] = response.street;

        console.log(this.userDetail);
        
      },
      error: (error) => {
        this.hasError = true;
        console.log('user detail error', error);
      },
    });
  }
}
