import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MediaList, Media } from './media';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  uri = 'https://medien-backend.herokuapp.com/api';

  constructor(private httpClient: HttpClient) { }

  addMedia(media: Media) {
    return this.httpClient.post(`${this.uri}/add`, media);
  }

  getAllMedia() {
    return this.httpClient.get<MediaList>(this.uri);
  }

  getFilteredMedia(filter: string): Observable<MediaList> {
    return this.httpClient.get<MediaList>(`${this.uri}/media/filter?filter=${filter}`);
  }

  getSingleMedia(id: string): Observable<MediaList> {
    return this.httpClient.get<MediaList>(`${this.uri}/${id}`);
  }

  updateMedia(media: Media, id: string): Observable<MediaList> {
    return this.httpClient.put<MediaList>(`${this.uri}/${id}`, media);
  }

  deleteMedia(id: string): Observable<any> {
    return this.httpClient.delete(`${this.uri}/${id}`);
  }
}
