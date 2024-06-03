import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailPage } from './transaction-detail.page';

describe('ProfilePage', () => {
  let component: TransactionDetailPage;
  let fixture: ComponentFixture<TransactionDetailPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TransactionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
