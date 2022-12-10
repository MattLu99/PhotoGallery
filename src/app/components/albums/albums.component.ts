import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album, AlbumDto } from 'src/app/models/album.model';
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
      this.galleryService.getUserAlbumsInLocation(this.loginService.currentUser.id, "$root")
        .subscribe((data: Album[]) => this.albums = data)
    );
  }

  reloadAlbums(): void {
    this.getCurrentAlbums();
  }

  createAlbum(name: string, description: string): void {
    for (var i = 0; i < this.albums.length; i++) {
      if (this.albums[i].name === name) {
        alert("You already have an album with the same name!");
        return;
      }
    }
    const location = "$root"
    this.subscriptions.push(
      this.galleryService.createNewAlbum(this.loginService.currentUser.id, {name: name, parentName: location, description: description} as AlbumDto)
        .subscribe()
    )
  }

}
