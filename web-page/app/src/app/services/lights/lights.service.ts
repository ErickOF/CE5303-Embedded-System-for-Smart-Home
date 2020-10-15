import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from './../../config/urls';


@Injectable({
  providedIn: 'root',
})
export class LightsService {
  constructor(private http: HttpClient) { }

  public change_light_state(room: string, state: number) {
    const body = { room, state };

    return this.http
      .post(Urls.CHANGE_LIGHT_STATE_URL, body,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*'),
        },
      );
  }
}
