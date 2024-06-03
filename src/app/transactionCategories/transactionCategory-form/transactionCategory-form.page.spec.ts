import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TransactionCategoryFormPage } from './transactionCategory-form.page';

describe('PostFormPage', () => {
  let component: TransactionCategoryFormPage;
  let fixture: ComponentFixture<TransactionCategoryFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionCategoryFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
