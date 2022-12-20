import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album, AlbumDto } from 'src/app/models/album.model';
import { PhotoGalleryBackendService } from 'src/app/services/photo-gallery-backend.service';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  albums: Album[] = [];

  constructor(private galleryService: PhotoGalleryBackendService,
              private userLogin: UserLoginService) { }

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
      this.galleryService.getUserAlbumsInLocation(this.userLogin.getUserId(), "$root")
        .subscribe((data: Album[]) => this.albums = data)
    );
  }

  createAlbum(name: string, description: string): void {
    if (!name || !description) {
      alert("You can't leave the album fields empty!")
      return;
    }
    const location = "$root"
    this.subscriptions.push(
      this.galleryService.createNewAlbum(this.userLogin.getUserId(), {name: name, parentName: location, description: description} as AlbumDto)
        .subscribe({next: _ => this.getCurrentAlbums(), error: e => alert(e.error)})
    );
  }

}
