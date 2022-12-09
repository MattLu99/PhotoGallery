import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {

  userLoggedIn: boolean = false;
  currentUser!: User;

  constructor(private router: Router) { }

  LoginUser(user: User): void {
    this.userLoggedIn = true;
    this.currentUser = user;
    this.router.navigate(['profile'])
  }

  LogoutUser(): void {
    this.userLoggedIn = false;
    this.currentUser = {} as User;
    this.router.navigate(['home'])
  }

}
