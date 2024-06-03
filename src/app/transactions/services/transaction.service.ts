import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Transaction,
  TransactionInsert,
} from 'src/app/transactions/interfaces/transaction';
import { Observable, map } from 'rxjs';
import {
  TransactionsResponse,
  SingleTransactionResponse,
} from 'src/app/transactions/interfaces/responses';
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  #transactionsUrl = 'transactions';
  #http = inject(HttpClient);

  getTransactions(): Observable<Transaction[]> {
    return this.#http
      .get<TransactionsResponse>(this.#transactionsUrl)
      .pipe(map((resp) => resp.transactions));
  }

  getTransactionsByUserId(userId: number): Observable<Transaction[]> {
    return this.#http
      .get<TransactionsResponse>(`${this.#transactionsUrl}/user/${userId}`)
      .pipe(map((resp) => resp.transactions));
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.#http
      .get<SingleTransactionResponse>(`${this.#transactionsUrl}/${id}`)
      .pipe(map((resp) => resp.transaction));
  }

  addTransaction(transaction: TransactionInsert): Observable<Transaction> {
    return this.#http
      .post<SingleTransactionResponse>(this.#transactionsUrl, transaction)
      .pipe(map((resp) => resp.transaction));
  }

  editTransaction(
    id: number,
    transaction: TransactionInsert
  ): Observable<Transaction> {
    return this.#http
      .patch<SingleTransactionResponse>(
        `${this.#transactionsUrl}/${id}`,
        transaction
      )
      .pipe(map((resp) => resp.transaction));
  }

  deleteTransaction(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#transactionsUrl}/${id}`);
  }
}
