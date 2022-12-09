import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { LoggedInService } from 'src/app/services/logged-in.service';
import { PhotoGalleryBackendService } from 'src/app/services/photo-gallery-backend.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  albums: Album[] = [];

  constructor(private galleryService: PhotoGalleryBackendService,
              private loginService: LoggedInService) { }

  ngOnInit(): void {
    this.getCurrentAlbums();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  getCurrentAlbums(): void {
    this.subscriptions.push(
      this.galleryService.getUserAlbumsInLocation(this.loginService.currentUser.id, "root")
        .subscribe((data: Album[]) => this.albums = data)
    );
  }

}
