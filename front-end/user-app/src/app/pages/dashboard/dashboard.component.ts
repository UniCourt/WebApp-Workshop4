import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private authService: AuthService){
    let loggedInUserId = this.authService.loggedInUser.id;
    if(!loggedInUserId){
      // window.location.href = "/"
    }
    console.log(loggedInUserId);
    
  }

}
