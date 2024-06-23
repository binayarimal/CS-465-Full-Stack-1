import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink,  RouterLinkActive, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  standalone:true,
  selector: 'app-navbar',
  imports:[CommonModule, RouterLink,RouterLinkActive, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  })


export class NavbarComponent implements OnInit {
  constructor(
  private authenticationService: AuthenticationService
  ) { }
  ngOnInit() { }
  public isLoggedIn(): boolean {
  return this.authenticationService.isLoggedIn();
  }
  public onLogout(): void {
  return this.authenticationService.logout();
  }
  }
  