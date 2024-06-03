import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TransactionFormPage } from './transaction-form.page';

describe('PostFormPage', () => {
  let component: TransactionFormPage;
  let fixture: ComponentFixture<TransactionFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
