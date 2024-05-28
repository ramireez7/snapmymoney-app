
export interface TransactionInsert {
  name: string;
  user_id: number;
  amount: number;
  transaction_type_id?: number;
  transaction_category_id?: number;
}

export interface Transaction extends TransactionInsert {
  id?: number;
  created: string;
}