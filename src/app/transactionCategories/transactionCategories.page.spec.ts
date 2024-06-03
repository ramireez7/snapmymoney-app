import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCategoriesPage } from './transactionCategories.page';

describe('TransactionCategoriesPage', () => {
  let component: TransactionCategoriesPage;
  let fixture: ComponentFixture<TransactionCategoriesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TransactionCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
