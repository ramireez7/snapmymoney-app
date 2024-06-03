
export interface TransactionCategoryInsert {
  name: string;
  user_id?: number;
}

export interface TransactionCategory extends TransactionCategoryInsert {
  id?: number;
}