import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PhotoGalleryBackendService } from 'src/app/services/photo-gallery-backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  usersCount!: number;
  albumsCount!: number;
  photosCount!: number;

  constructor(private galleryService: PhotoGalleryBackendService) { }

  ngOnInit(): void {
    this.getDatabaseNumbers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  getDatabaseNumbers(): void {
    this.subscriptions.push(this.galleryService.countUsers().subscribe((data: number) => this.usersCount = data));
    this.subscriptions.push(this.galleryService.countAlbums().subscribe((data: number) => this.albumsCount = data));
    this.subscriptions.push(this.galleryService.countPhotos().subscribe((data: number) => this.photosCount = data));
  }

}
