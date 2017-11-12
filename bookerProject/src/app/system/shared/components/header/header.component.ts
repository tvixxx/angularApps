import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {User} from "../../../../shared/models/user.model";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-system-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
