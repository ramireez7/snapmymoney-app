import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TransactionType, TransactionTypeInsert } from '../interfaces/transactionType';
import { Observable, map } from 'rxjs';
import { TransactionTypesResponse, SingleTransactionTypeResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class TransactionTypeService {
  #transactionTypesUrl = 'transactionTypes';
  #http = inject(HttpClient);

  getTransactionTypes(): Observable<TransactionType[]> {
    return this.#http
      .get<TransactionTypesResponse>(`${this.#transactionTypesUrl}`)
      .pipe(map((resp) => resp.transactionTypes));
  }

  getTransactionTypesByUserId(userId: number): Observable<TransactionType[]> {
    return this.#http
      .get<TransactionTypesResponse>(`${this.#transactionTypesUrl}/user/${userId}`)
      .pipe(map((resp) => resp.transactionTypes));
  }

  getTransactionTypeById(id: number): Observable<TransactionType> {
    return this.#http
      .get<SingleTransactionTypeResponse>(`${this.#transactionTypesUrl}/${id}`)
      .pipe(map((resp) => resp.transactionType));
  }

  addTransactionType(transactionType: TransactionTypeInsert): Observable<TransactionType> {
    return this.#http
      .post<SingleTransactionTypeResponse>(this.#transactionTypesUrl, transactionType)
      .pipe(map((resp) => resp.transactionType));
  }

  editTransactionType(id: number, transactionType: TransactionTypeInsert): Observable<TransactionType> {
    return this.#http
      .put<SingleTransactionTypeResponse>(`${this.#transactionTypesUrl}/${id}`, transactionType)
      .pipe(map((resp) => resp.transactionType));
  }

  deleteTransactionType(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#transactionTypesUrl}/${id}`);
  }
}
