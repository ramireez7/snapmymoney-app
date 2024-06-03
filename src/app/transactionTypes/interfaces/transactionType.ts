
export interface TransactionTypeInsert {
  name: string;
  user_id?: number;
}

export interface TransactionType extends TransactionTypeInsert {
  id?: number;
}