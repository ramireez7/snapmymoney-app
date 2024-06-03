import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDetailPage } from './target-detail.page';

describe('ProfilePage', () => {
  let component: TargetDetailPage;
  let fixture: ComponentFixture<TargetDetailPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TargetDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
