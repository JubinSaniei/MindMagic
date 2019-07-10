import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  home = (window.location.pathname === '/');

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.home) {
      return;
    } else {
      const token = sessionStorage.getItem('token');
      if (token === null) {
        window.location.href = '/';
        return;
      }
    }
  }
}
