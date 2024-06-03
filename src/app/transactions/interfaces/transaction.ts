
export interface TransactionInsert {
  name: string;
  user_id: number;
  amount: number|undefined;
  transaction_type_id?: number;
  transaction_category_id?: number | null;
}

export interface Transaction extends TransactionInsert {
  id?: number;
  created: string;
  transaction_category_name?: string;
}