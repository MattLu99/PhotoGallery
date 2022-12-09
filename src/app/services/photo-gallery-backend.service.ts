import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';
import { User } from '../models/user.model';

//Local connection hardcoded into service
const GALLERY_ENDPOINT = "https://localhost:7172/api";

@Injectable({
  providedIn: 'root'
})
export class PhotoGalleryBackendService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /* User Endpoints Start */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${GALLERY_ENDPOINT}/User`);
  }

  countUsers(): Observable<number> {
    return this.http.get<number>(`${GALLERY_ENDPOINT}/User/Count`);
  }

  /* User Endpoints End */

  /* Album Endpoints Start */
  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${GALLERY_ENDPOINT}/Album`);
  }

  countAlbums(): Observable<number> {
    return this.http.get<number>(`${GALLERY_ENDPOINT}/Album/Count`);
  }

  /* Album Endpoints End */

  /* Photo Endpoints Start */
  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${GALLERY_ENDPOINT}/Photo`);
  }

  countPhotos(): Observable<number> {
    return this.http.get<number>(`${GALLERY_ENDPOINT}/Photo/Count`);
  }

  /* Photo Endpoints End */
}
