import { Component } from '@angular/core';
import { LoggedInService } from './services/logged-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Photo Gallery';

  constructor(private loginService: LoggedInService) { }

  userLoggedIn(): boolean {
    return this.loginService.userLoggedIn;
  }

  logout(): void {
    this.loginService.LogoutUser()
  }

}
