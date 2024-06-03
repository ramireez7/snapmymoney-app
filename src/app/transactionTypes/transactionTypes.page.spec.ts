import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypesPage } from './transactionTypes.page';

describe('TransactionTypesPage', () => {
  let component: TransactionTypesPage;
  let fixture: ComponentFixture<TransactionTypesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TransactionTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
