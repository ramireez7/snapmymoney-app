import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TargetCategoryFormPage } from './targetCategory-form.page';

describe('PostFormPage', () => {
  let component: TargetCategoryFormPage;
  let fixture: ComponentFixture<TargetCategoryFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TargetCategoryFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
