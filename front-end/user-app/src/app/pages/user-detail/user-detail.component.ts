import { Component, Input } from '@angular/core';
import { UserDetail } from 'src/app/model/common.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  userDetail: UserDetail = {
    id: this.userService.userId,
    name: '',
    city: '',
    companyName: '',
    emailId: '',
    phoneNumber: '',
    street: '',
    zipCode: '',
  };

  hasError: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.hasError = false;
    this.userService.getUserDetail(this.userService.userId).subscribe({
      next: (response: any) => {
        console.log('user detail response', response);
        this.userDetail.name = response.name;
        this.userDetail.emailId = response.email;
        this.userDetail.city = response.address.city;
        this.userDetail.companyName = response.company.name;
        this.userDetail.phoneNumber = response.phone;
        this.userDetail.zipCode = response.address.zipcode;
        this.userDetail.street = response.address.street;
      },
      error: (error) => {
        this.hasError = true;
        console.log('user detail error', error);
      },
    });
  }
}
