import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../../models/photo.model';
import { PhotoDto } from '../../models/photoDto';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  API_URL = "https://localhost:7172/api/"

  base64textString: String[] = [];

  photos: Photo[] = []

  id = "91f31b4c-0388-4fca-a274-73bbc54b0e0d";

  selectedImage!: File;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos(): void {
    this.http.get<Photo[]>(this.API_URL + `Album/${this.id}/Photos`).subscribe(
      (data: Photo[]) => {this.photos = data}
    );
  }

  addTest(): void {
    const name = "Test_3";
    const description = "Tessssst";
    const takenAtTime = new Date("2022/03/10");
    const takenAtLocation = "London";
    const imageData = this.base64textString.join();
    this.createPhoto(this.id, {name, description, takenAtTime, takenAtLocation, imageData} as PhotoDto)
          .subscribe();
  }

  createPhoto(id: string, request: PhotoDto): Observable<Photo> {
    return this.http.post<Photo>(this.API_URL + `Album/${id}/NewPhoto`, request, this.httpOptions);
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
