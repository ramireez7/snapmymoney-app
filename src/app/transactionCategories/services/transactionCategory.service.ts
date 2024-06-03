import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TransactionCategory, TransactionCategoryInsert } from 'src/app/transactionCategories/interfaces/transactionCategory';
import { Observable, map } from 'rxjs';
import {
  TransactionCategoriesResponse,
  SingleTransactionCategoryResponse,
} from 'src/app/transactionCategories/interfaces/responses';
@Injectable({
  providedIn: 'root',
})
export class TransactionCategoryService {
  #transactionCategoriesUrl = 'transactionCategories';
  #http = inject(HttpClient);

  getTransactionCategories(): Observable<TransactionCategory[]> {
    return this.#http
      .get<TransactionCategoriesResponse>(`${this.#transactionCategoriesUrl}`)
      .pipe(map((resp) => resp.transactionCategories));
  }

  getTransactionCategoriesByUserId(userId: number): Observable<TransactionCategory[]> {
    return this.#http
      .get<TransactionCategoriesResponse>(`${this.#transactionCategoriesUrl}/user/${userId}`)
      .pipe(map((resp) => resp.transactionCategories));
  }

  getTransactionCategoryById(id: number): Observable<TransactionCategory> {
    return this.#http
      .get<SingleTransactionCategoryResponse>(`${this.#transactionCategoriesUrl}/${id}`)
      .pipe(map((resp) => resp.transactionCategory));
  }

  addTransactionCategory(transactionCategory: TransactionCategoryInsert): Observable<TransactionCategory> {
    return this.#http
      .post<SingleTransactionCategoryResponse>(this.#transactionCategoriesUrl, transactionCategory)
      .pipe(map((resp) => resp.transactionCategory));
  }

  editTransactionCategory(id: number, transactionCategory: TransactionCategoryInsert): Observable<TransactionCategory> {
    return this.#http
      .put<SingleTransactionCategoryResponse>(`${this.#transactionCategoriesUrl}/${id}`, transactionCategory)
      .pipe(map((resp) => resp.transactionCategory));
  }

  deleteTransactionCategory(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#transactionCategoriesUrl}/${id}`);
  }
}
