import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserDto } from 'src/app/models/user.model';
import { LoggedInService } from 'src/app/services/logged-in.service';
import { PhotoGalleryBackendService } from 'src/app/services/photo-gallery-backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(private galleryService: PhotoGalleryBackendService,
              private loginService: LoggedInService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  register(name: string, password: string, passwordAgain: string) {
    if (password === passwordAgain) {
      this.subscriptions.push(this.galleryService.registerUser({name, password} as UserDto)
          .subscribe({next: (data: User) => this.loginService.LoginUser(data), error: e => alert(e.error)}));
    } else {
      alert("Passwords do not match!");
    }
  }

}
