import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { User, UserLogin } from '../interfaces/user';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #logged = signal(false);

  #http = inject(HttpClient);

  get logged() {
    return this.#logged.asReadonly();
  }

  login(userLogin: UserLogin): Observable<void> {
    return this.#http
      .post<{ token: string; userId: string }>('auth/login', userLogin)
      .pipe(
        // SwitchMap allows to return a value inside an Observable or a Promise (this case -> async)
        switchMap(async (r) => {
          try {
            await Preferences.set({ key: 'fs-token', value: r.token });
            await Preferences.set({ key: 'user-id', value: r.userId });
            this.#logged.set(true);
          } catch (e) {
            throw new Error("Can't save authentication token in storage!");
          }
        })
      );
  }

  register(user: User): Observable<void> {
    return this.#http.post<void>('auth/register', user);
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'fs-token' });
    await Preferences.remove({ key: 'user-id' });
    this.#logged.set(false);
  }

  isLogged(): Observable<boolean> {
    if (this.#logged()) {
      // User is logged
      return of(true);
    }
    // from transforms a Promise into an Observable
    return from(Preferences.get({ key: 'fs-token' })).pipe(
      switchMap((token) => {
        if (!token.value) {
          // No token
          return of(false);
        }

        // Try to get the user profile as a way to validate the token
        return from(Preferences.get({ key: 'user-id' })).pipe(
          switchMap((userId) => {
            if (!userId.value) {
              return of(false);
            }

            return this.#http.get<User>('users/' + userId.value).pipe(
              map(() => {
                this.#logged.set(true);
                return true;
              }),
              catchError(() => of(false)) // Token not valid!
            );
          })
        );
      }),
      catchError(() => of(false)) // No value in Preferences
    );
  }

  getProfile(): Observable<User> {
    return from(Preferences.get({ key: 'user-id' })).pipe(
      switchMap((loggedUserId) => {
        return this.#http
          .get<{ user: User }>('users/' + loggedUserId.value)
          .pipe(map((response) => response.user));
      })
    );
  }
}