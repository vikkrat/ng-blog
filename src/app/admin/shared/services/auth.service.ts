import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// -------------------------------------------
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// -------------------------------------------
import { environment } from '../../../../environments/environment';
import { FirebaseAuthResponse, User } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlAuth = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))

    if (new Date() > expDate) {
      this.logOut();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  logIn(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`${this.urlAuth}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logOut() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Your email is not found');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Your email is invalid');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Your password is invalid');
        break;
    }
  }

  private setToken(response: FirebaseAuthResponse | null) {
    console.log(response);

    if (response) {
      const expDate = new Date( new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
