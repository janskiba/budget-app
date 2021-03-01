import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //Pipes let you combine multiple functions into a single function.
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          console.log(user.email);
          //this.userId = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges(); // <-- valueChanges konwertuje go na observable
        } else {
          return of(null);
        }
      })
    );
  }

  // Sign in with Google
  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    //pass user data to updateUserData
    this.updateUserData(credential.user);
    this.router.navigate(['/mainAppPage']);
  }

  async googleSignOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  private updateUserData(user) {
    //we are taking user from the credential that we get from the popup sign in and pointing to the document in the database with that user id
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    //this.userId = user.uid;
    //defining data payload that we wanna save
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    //set is destructive so we adding merge true option which will only change the properties
    //that change in the data payload (existinng data will not be erase)
    return userRef.set(data, { merge: true });
  }
}
