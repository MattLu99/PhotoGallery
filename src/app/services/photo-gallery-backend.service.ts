import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album, AlbumDto } from '../models/album.model';
import { Photo, PhotoDto } from '../models/photo.model';
import { User, UserDto } from '../models/user.model';

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

  loginUser(userDto: UserDto): Observable<User> {
    return this.http.post<User>(`${GALLERY_ENDPOINT}/User/Login`, userDto, this.httpOptions);
  }

  registerUser(userDto: UserDto): Observable<User> {
    return this.http.post<User>(`${GALLERY_ENDPOINT}/User/Register`, userDto, this.httpOptions);
  }

  getUserAlbums(id: string): Observable<Album[]> {
    return this.http.get<Album[]>(`${GALLERY_ENDPOINT}/User/${id}/Albums`);
  }

  getUserAlbumsInLocation(id: string, location: string): Observable<Album[]> {
    return this.http.get<Album[]>(`${GALLERY_ENDPOINT}/User/${id}/AlbumsByLocation/${location}`);
  }

  createNewAlbum(id: string, albumDto: AlbumDto): Observable<Album> {
    return this.http.post<Album>(`${GALLERY_ENDPOINT}/User/${id}/NewAlbum`, albumDto, this.httpOptions);
  }

  /* User Endpoints End */

  /* Album Endpoints Start */
  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${GALLERY_ENDPOINT}/Album`);
  }

  countAlbums(): Observable<number> {
    return this.http.get<number>(`${GALLERY_ENDPOINT}/Album/Count`);
  }

  getAlbumById(id: string): Observable<Album> {
    return this.http.get<Album>(`${GALLERY_ENDPOINT}/Album/${id}`);
  }

  getAlbumPhotosById(id: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${GALLERY_ENDPOINT}/Album/${id}/Photos`);
  }

  createNewPhoto(id: string, photoDto: PhotoDto): Observable<Photo> {
    return this.http.post<Photo>(`${GALLERY_ENDPOINT}/Album/${id}/NewPhoto`, photoDto, this.httpOptions);
  }

  /* Album Endpoints End */

  /* Photo Endpoints Start */
  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${GALLERY_ENDPOINT}/Photo`);
  }

  countPhotos(): Observable<number> {
    return this.http.get<number>(`${GALLERY_ENDPOINT}/Photo/Count`);
  }

  getPhotoById(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${GALLERY_ENDPOINT}/Photo/${id}`);
  }

  /* Photo Endpoints End */
}
