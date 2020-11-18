import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from './../../config/urls';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WebCamService {
  constructor(private http: HttpClient) { }

  takePhoto() {
    return this.http
      .get(Urls.TAKE_PHOTO_URL,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*'),
          responseType: 'arraybuffer',
        },
      );
  }
}
