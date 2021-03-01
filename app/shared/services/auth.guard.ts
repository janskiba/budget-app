import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route, state): Observable<boolean> {
    console.log('guard activated');
    return this.authService.user$.pipe(
      take(1),
      map((user) => !!user), //mapping to boolean
      tap((loggedIn) => {
        if (!loggedIn) {
          console.log('acces denied');
          this.router.navigate(['/']);
        }
      })
    );
  }
}
