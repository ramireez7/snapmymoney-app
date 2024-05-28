
export interface TargetInsert {
  name: string;
  user_id: number;
  target_amount: number;
  target_category_id?: number;
}

export interface Target extends TargetInsert {
  id?: number;
  created: string;
  current_amount: number;
}