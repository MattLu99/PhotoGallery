import { Component } from '@angular/core';
import { UserLoginService } from './services/user-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Photo Gallery';

  constructor(private userLogin: UserLoginService) { }

  userLoggedIn(): boolean {
    return this.userLogin.hasUserId();
  }

  logout(): void {
    this.userLogin.logoutUser();
  }

}
