import { Transaction } from "./transaction";

export interface TransactionsResponse {
  transactions: Transaction[];
}

export interface SingleTransactionResponse {
  transaction: Transaction;
}