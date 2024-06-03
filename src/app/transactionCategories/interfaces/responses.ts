import { TransactionCategory } from './transactionCategory';

export interface TransactionCategoriesResponse {
  transactionCategories: TransactionCategory[];
}

export interface SingleTransactionCategoryResponse {
  transactionCategory: TransactionCategory;
}