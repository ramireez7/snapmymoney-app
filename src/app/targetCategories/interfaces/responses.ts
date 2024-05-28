import { TargetCategory } from "./targetCategory";

export interface TargetCategoriesResponse {
  targetCategories: TargetCategory[];
}

export interface SingleTargetCategoryResponse {
  targetCategory: TargetCategory;
}