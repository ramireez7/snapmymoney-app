import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TargetCategory, TargetCategoryInsert } from 'src/app/targetCategories/interfaces/targetCategory';
import { Observable, map } from 'rxjs';
import {
  TargetCategoriesResponse,
  SingleTargetCategoryResponse,
} from 'src/app/targetCategories/interfaces/responses';
@Injectable({
  providedIn: 'root',
})
export class TargetCategoryService {
  #targetCategoriesUrl = 'targetCategories';
  #http = inject(HttpClient);

  getTargetCategories(): Observable<TargetCategory[]> {
    return this.#http
      .get<TargetCategoriesResponse>(`${this.#targetCategoriesUrl}`)
      .pipe(map((resp) => resp.targetCategories));
  }

  getTargetCategoriesByUserId(userId: number): Observable<TargetCategory[]> {
    return this.#http
      .get<TargetCategoriesResponse>(`${this.#targetCategoriesUrl}/user/${userId}`)
      .pipe(map((resp) => resp.targetCategories));
  }

  getTargetCategoryById(id: number): Observable<TargetCategory> {
    return this.#http
      .get<SingleTargetCategoryResponse>(`${this.#targetCategoriesUrl}/${id}`)
      .pipe(map((resp) => resp.targetCategory));
  }

  addTargetCategory(targetCategory: TargetCategoryInsert): Observable<TargetCategory> {
    return this.#http
      .post<SingleTargetCategoryResponse>(this.#targetCategoriesUrl, targetCategory)
      .pipe(map((resp) => resp.targetCategory));
  }

  editTargetCategory(id: number, targetCategory: TargetCategoryInsert): Observable<TargetCategory> {
    return this.#http
      .put<SingleTargetCategoryResponse>(`${this.#targetCategoriesUrl}/${id}`, targetCategory)
      .pipe(map((resp) => resp.targetCategory));
  }

  deleteTargetCategory(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#targetCategoriesUrl}/${id}`);
  }
}
