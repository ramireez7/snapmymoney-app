import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RemoveTargetAmountModalComponent } from './remove-target-amount-modal.component';

describe('TargetModalComponent', () => {
  let component: RemoveTargetAmountModalComponent;
  let fixture: ComponentFixture<RemoveTargetAmountModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveTargetAmountModalComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveTargetAmountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
