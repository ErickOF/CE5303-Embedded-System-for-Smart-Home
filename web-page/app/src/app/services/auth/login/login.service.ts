import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from './../../../config/urls';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) { }

  public login(username: string, password: number) {
    const body = { username, password };

    return this.http
      .post(Urls.LOGIN_URL, body,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*'),
        },
      );
  }
}
