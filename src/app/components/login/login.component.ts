import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, UserDto } from 'src/app/models/user.model';
import { PhotoGalleryBackendService } from 'src/app/services/photo-gallery-backend.service';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(private galleryService: PhotoGalleryBackendService,
              private userLogin: UserLoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  login(name: string, password: string) {
    this.subscriptions.push(this.galleryService.loginUser({name, password} as UserDto)
        .subscribe({next: (data: User) => {this.userLogin.loginUserId(data.id); this.router.navigate(['\..', 'profile']);},
                     error: e => alert(e.error)}));
  }

}
