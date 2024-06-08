import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  ModalController,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { Target } from '../../interfaces/target';

@Component({
  selector: 'remove-target-amount-modal',
  templateUrl: './remove-target-amount-modal.component.html',
  styleUrls: ['./remove-target-amount-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonAvatar,
    IonImg,
    FormsModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class RemoveTargetAmountModalComponent {
  @Input() target!: Target;
  amount = null;

  #modalCtrl = inject(ModalController);

  send() {
    this.#modalCtrl.dismiss({ amount: this.amount, target: this.target });
  }

  close() {
    this.#modalCtrl.dismiss();
  }
}
