import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoggedInService } from 'src/app/services/logged-in.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(private loginService: LoggedInService) { }

  ngOnInit(): void {
    this.user = this.loginService.currentUser;
  }

}
