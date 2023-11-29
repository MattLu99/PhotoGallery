import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { PhotoGalleryBackendService } from 'src/app/services/photo-gallery-backend.service';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(private galleryService: PhotoGalleryBackendService,
              private userLogin: UserLoginService) { }

  ngOnInit(): void {
    this.galleryService.getUserById(this.userLogin.getUserId()!)
      .subscribe({next: (data: User)=> this.user = data});
  }

}
