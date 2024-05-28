
export interface TargetCategoryInsert {
  name: string;
  user_id?: number;
}

export interface TargetCategory extends TargetCategoryInsert {
  id?: number;
}