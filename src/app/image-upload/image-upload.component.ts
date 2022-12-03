import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  API_URL = "https://localhost:7172/api/"

  photos: Photo[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos(): void {
    this.http.get<Photo[]>(this.API_URL + "Photo").subscribe(
      (data: Photo[]) => {this.photos = data}
    );
  }

}
