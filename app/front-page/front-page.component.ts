import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
})
export class FrontPageComponent implements OnInit {
  constructor(public authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {}

  onGoogleSignInButtonClick() {
    this.authService.googleSignIn();
  }
}
