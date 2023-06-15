import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {

  hasError: boolean = false;
  userFormBuilder: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,private userService: UserService) {
      this.userFormBuilder = this.formBuilder.group({
        emailId: formBuilder.control("", [Validators.required, Validators.email]),
        name: formBuilder.control("", [Validators.required]),
        phoneNumber: formBuilder.control("", [Validators.required]),
        companyName: formBuilder.control("", [Validators.required]),
        city: formBuilder.control("", [Validators.required]),
        street: formBuilder.control("", [Validators.required]),
        zipCode: formBuilder.control("", [Validators.required]),
    });
  }

  addUser() {
    this.hasError = false;
    if (this.userFormBuilder.valid) {
      this.userService.addUser({
        id: Math.floor(Math.random() * 10),
        name: this.userFormBuilder.controls['name'].value,
        emailId: this.userFormBuilder.controls['emailId'].value,
        phoneNumber: this.userFormBuilder.controls['phoneNumber'].value,
        companyName: this.userFormBuilder.controls['companyName'].value,
        street: this.userFormBuilder.controls['street'].value,
        city: this.userFormBuilder.controls['city'].value,
        zipCode: this.userFormBuilder.controls['zipCode'].value,
      });
    } else {
      this.hasError = true;
    }
  }
}
