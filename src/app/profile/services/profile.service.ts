import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  User,
  UserAvatarEdit,
  UserPasswordEdit,
  UserProfileEdit,
} from 'src/app/auth/interfaces/user';
import { Observable, map } from 'rxjs';
import { UserResponse } from 'src/app/auth/interfaces/responses';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  #usersUrl = 'users';
  #http = inject(HttpClient);

  getProfile(): Observable<User> {
    return this.#http
      .get<UserResponse>(`${this.#usersUrl}/me`)
      .pipe(map((resp) => resp.user));
  }

  getProfileById(id: number): Observable<User> {
    return this.#http
      .get<UserResponse>(`${this.#usersUrl}/${id}`)
      .pipe(map((resp) => resp.user));
  }

  saveProfile(nameAndEmail: UserProfileEdit, userId: Number): Observable<User> {
    return this.#http
      .put<UserResponse>(`${this.#usersUrl}/${userId}`, nameAndEmail)
      .pipe(map((resp) => resp.user));
  }

  saveAvatar(avatar: UserAvatarEdit): Observable<User> {
    return this.#http
      .put<UserResponse>(`${this.#usersUrl}/me/avatar`, avatar)
      .pipe(map((resp) => resp.user));
  }

  savePassword(password: UserPasswordEdit): Observable<User> {
    return this.#http
      .put<UserResponse>(`${this.#usersUrl}/me/password`, password)
      .pipe(map((resp) => resp.user));
  }
}
