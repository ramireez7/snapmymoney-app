import { TransactionType } from './transactionType';

export interface TransactionTypesResponse {
  transactionTypes: TransactionType[];
}

export interface SingleTransactionTypeResponse {
  transactionType: TransactionType;
}