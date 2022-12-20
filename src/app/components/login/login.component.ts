import { Component, OnDestroy, OnInit } from '@angular/core';
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
              private userLogin: UserLoginService) { }

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
        .subscribe({next: (data: User) => this.userLogin.loginUserId(data.id), error: e => alert(e.error)}));
  }

}
