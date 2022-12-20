import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDto } from 'src/app/models/user.model';
import { PhotoGalleryBackendService } from 'src/app/services/photo-gallery-backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(private galleryService: PhotoGalleryBackendService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  register(name: string, password: string, passwordAgain: string) {
    if (!name || !password) {
      alert("You can't leave the values empty!");
    } else if (password !== passwordAgain) {
      alert("Passwords do not match!");
    } else {
      this.subscriptions.push(this.galleryService.registerUser({name, password} as UserDto)
          .subscribe({next: _ => this.router.navigate(["login"]), error: e => alert(e.error)}));
    }
  }

}
