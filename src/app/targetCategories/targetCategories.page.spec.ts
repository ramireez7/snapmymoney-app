import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetCategoriesPage } from './targetCategories.page';

describe('TargetCategoriesPage', () => {
  let component: TargetCategoriesPage;
  let fixture: ComponentFixture<TargetCategoriesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TargetCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
