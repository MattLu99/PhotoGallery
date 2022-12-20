import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              private router: Router,
              private aroute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.aroute.snapshot.params['id'];
    this.subscriptions.push(this.aroute.params
      .subscribe(_ => {this.id = this.aroute.snapshot.params['id'];
                        this.onNewAlbum()})
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  onNewAlbum(): void {
    this.currentAlbum = {} as Album;
    this.getCurrentAlbumFromRoute();
  }

  getCurrentAlbumFromRoute() {
    this.subscriptions.push(
      this.galleryService.getAlbumById(this.id)
        .subscribe({next: (data: Album) => {this.currentAlbum = data;
          this.getCurrentAlbums();
          this.getCurrentPhotos();
        }}));
  }

  getCurrentAlbums(): void {
    this.albums = [];
    this.subscriptions.push(
      this.galleryService.getUserAlbumsInLocation(this.userLogin.getUserId(), this.currentAlbum.name)
        .subscribe((data: Album[]) => this.albums = data)
    );
  }

  getCurrentPhotos(): void {
    this.photos = [];
    this.subscriptions.push(
      this.galleryService.getAlbumPhotosById(this.id)
        .subscribe((data: Photo[]) => this.photos = data)
    );
  }

  createAlbum(name: string, description: string): void {
    if (!name || !description) {
      alert("You can't leave the album fields empty!")
      return;
    }
    const location = this.currentAlbum.name;
    this.subscriptions.push(
      this.galleryService.createNewAlbum(this.userLogin.getUserId(), {name: name, parentName: location, description: description} as AlbumDto)
        .subscribe({next: _ => this.getCurrentAlbums(), error: e => alert(e.error)})
    )
  }

  createPhoto(name: string, description: string, takenAtT: string, takenAtLocation: string): void {
    if (!name || !description || !takenAtT || !takenAtLocation) {
      alert("You can't leave the photo fields empty!")
      return;
    }
    const takenAtTime = new Date(takenAtT);
    const imageData = this.base64textString.join();
    this.subscriptions.push(
      this.galleryService.createNewPhoto(this.id, {name: name, description: description, takenAtTime: takenAtTime,
                                                    takenAtLocation: takenAtLocation, imageData: imageData} as PhotoDto)
        .subscribe({next: _ => this.getCurrentPhotos(), error: e => alert(e.error)})
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
