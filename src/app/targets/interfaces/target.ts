
export interface TargetInsert {
  name: string;
  user_id: number;
  current_amount?: number;
  target_amount: number | undefined;
  target_category_id?: number;
}

export interface Target extends TargetInsert {
  id?: number;
  created: string;
  target_category_name?: string;
}