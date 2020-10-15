import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

import { LoginService } from './../../services/auth/login/login.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {

  public _login(value) {
    if (value.email === 'root' && value.password === 'root') {
      this.router.navigate(['pages/iot-dashboard']);
    }
  }
}
