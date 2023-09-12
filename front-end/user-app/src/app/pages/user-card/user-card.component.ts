import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() emailId: string;
  @Input() city: string;

  @Output() deleteUser = new EventEmitter<Number>();

  constructor(private userService: UserService) {}

  setUserId(id: number) {
    this.userService.userId = id;
  }

  deleteUserById(contactId) {
    this.userService.deleteUser(contactId);
  }
}
