import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TargetFormPage } from './target-form.page';

describe('PostFormPage', () => {
  let component: TargetFormPage;
  let fixture: ComponentFixture<TargetFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TargetFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
