import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  /**
   * METHOD TO LOGIN USING GOOGLE ACCOUNT
   */
  loginWithGoogle(): Promise<void> {
    return this.authLogin(new auth.GoogleAuthProvider())
      .then((response) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response));
        }
      })
      .catch((err) => console.log(err));
  }

  loginWithCredentials(user: {
    email: string;
    password: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(user.email, user.password)
        .then((response) => {
          if (response) {
            localStorage.setItem('user', JSON.stringify(response));
            resolve(response as any);
          }
        })
        .catch((err) => reject(err));
    });
  }

  signUpWithCredentials(user: {
    email: string;
    password: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((response) => {
          if (response) {
            localStorage.setItem('user', JSON.stringify(response));
            resolve(response as any);
          }
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * GET THE CURRENT USER
   */
  getCurrentUser(): Observable<User> {
    return this.afAuth.authState;
  }

  /**
   * USER LOGOUT
   */
  logout(): Promise<void> {
    return this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
      })
      .catch((err) => console.log(err));
  }

  /**
   * RETURN TRUE IF THE USER IS LOGGED IN
   */
  isAuthenticated(): boolean {
    const user: User = JSON.parse(localStorage.getItem('user')) ?? null;

    return user !== null;
  }

  /**
   * LOGIN WITH DIFFERENT FIREBASE PROVIDERS
   * @param provider
   */
  private authLogin(provider: auth.AuthProvider): Promise<auth.UserCredential> {
    return this.afAuth.signInWithPopup(provider);
  }
}
