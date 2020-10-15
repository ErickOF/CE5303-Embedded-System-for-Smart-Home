import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from './../../config/urls';


@Injectable({
  providedIn: 'root',
})
export class DoorsService {
  constructor(private http: HttpClient) { }

  public getDoorState(door: string) {
    const body = { door };

    return this.http
      .post(Urls.GET_DOOR_STATE_URL, body,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json'),
        },
      );
  }
}
