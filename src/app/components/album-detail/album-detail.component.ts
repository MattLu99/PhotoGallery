import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album, AlbumDto } from 'src/app/models/album.model';
import { Photo, PhotoDto } from 'src/app/models/photo.model';
import { PhotoGalleryBackendService } from 'src/app/services/photo-gallery-backend.service';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  albums!: Album[];
  photos!: Photo[];

  id!: string;
  currentAlbum!: Album;


  base64textString: String[] = [];
  selectedImage!: File;

  constructor(private galleryService: PhotoGalleryBackendService,
              private userLogin: UserLoginService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onView();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  onView(): void {
    this.albums = [];
    this.photos = [];
    this.id = "";
    this.currentAlbum = {} as Album;
    this.getRouteId();
    this.getCurrentAlbumFromRoute();
  }

  getRouteId() {
    this.subscriptions.push(this.route.params
      .subscribe(params => this.id = params['id'])
    );
  }

  getCurrentAlbumFromRoute() {
    this.subscriptions.push(
      this.galleryService.getAlbumById(this.id)
        .subscribe((data: Album) => this.currentAlbum = data));
  }

  getCurrentAlbums(): void {
    this.subscriptions.push(
      this.galleryService.getUserAlbumsInLocation(this.userLogin.getUserId(), this.currentAlbum.name)
        .subscribe((data: Album[]) => this.albums = data)
    );
  }

  getCurrentPhotos(): void {
    this.subscriptions.push(
      this.galleryService.getAlbumPhotosById(this.id)
        .subscribe((data: Photo[]) => this.photos = data)
    );
  }

  reload(): void {
    this.getCurrentAlbums();
    this.getCurrentPhotos();
  }

  createAlbum(name: string, description: string): void {
    for (var i = 0; i < this.albums.length; i++) {
      if (this.albums[i].name === name) {
        alert("You already have an album with the same name!");
        return;
      }
    }
    const location = this.currentAlbum.name;
    this.subscriptions.push(
      this.galleryService.createNewAlbum(this.userLogin.getUserId(), {name: name, parentName: location, description: description} as AlbumDto)
        .subscribe()
    )
  }

  createPhoto(name: string, description: string, takenAtT: string, takenAtLocation: string): void {
    for (var i = 0; i < this.photos.length; i++) {
      if (this.photos[i].name === name) {
        alert("You already have a photo with the same name!");
        return;
      }
    }
    const takenAtTime = new Date(takenAtT);
    const imageData = this.base64textString.join();
    this.subscriptions.push(
      this.galleryService.createNewPhoto(this.id, {name: name, description: description, takenAtTime: takenAtTime,
                                                                            takenAtLocation: takenAtLocation, imageData: imageData} as PhotoDto)
        .subscribe()
    )
  }

  onUploadChange(evt: any): void {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e: any) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

}
