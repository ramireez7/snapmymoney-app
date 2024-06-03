import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TransactionTypeFormPage } from './transactionType-form.page';

describe('PostFormPage', () => {
  let component: TransactionTypeFormPage;
  let fixture: ComponentFixture<TransactionTypeFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionTypeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
