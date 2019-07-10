import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenDecode } from 'src/app/shared/tokenDecoder';
import { LoginService } from 'src/app/services/login.service';
declare const $: any;


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
})


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  model: any = { userName: '', password: '' };
  decodeModel: any = {};
  activeToken: any = {};
  errorMsg: any = '';
  profileView = false;
  loginView = true;
  firstName = '';


  ngOnInit() {
    this.activeToken = sessionStorage.getItem('token');
    // console.log(this.activeToken === this.decodeModel);
    if (this.activeToken) {
      this.profileView = true;
      this.loginView = false;
    }

  }

  onLogin(form: any): void {

    if (!form.valid) {
      return;
    }
    this.loginService.login(this.model).subscribe(data => {
      window.sessionStorage.setItem('token', data);
      this.decodeModel = TokenDecode.getDecodedAccessToken();

      if (this.decodeModel.firstName === null) {
        this.firstName = '';
      }
      this.firstName = this.decodeModel.firstName;
      this.router.navigate(['dashboard']);
      this.profileView = true;
      this.loginView = false;
    }, err => {
      this.errorMsg = err.error;
    });
  }

  onLogout() {
    window.sessionStorage.removeItem('token');
    this.router.navigate(['']);
    this.profileView = false;
    this.loginView = true;
  }

  errMsgReset() {
    this.errorMsg = '';
  }

}
