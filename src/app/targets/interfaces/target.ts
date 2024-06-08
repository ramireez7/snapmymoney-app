
export interface TargetInsert {
  name: string;
  user_id: number;
  target_amount: number | undefined;
  current_amount?: number;
  target_category_id?: number;
}

export interface Target extends TargetInsert {
  id?: number;
  created: string;
  target_category_name?: string;
}

export interface TargetAmount {
  amount: number;
  remove: number;
}