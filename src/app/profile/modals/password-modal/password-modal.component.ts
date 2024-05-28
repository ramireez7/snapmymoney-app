import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { User } from 'src/app/auth/interfaces/user';
import { ValueEqualsDirective } from 'src/app/validators/value-equals.directive';

@Component({
  selector: 'profile-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss'],
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
    FormsModule,
    ValueEqualsDirective
  ],
})
export class PasswordModalComponent {
  @Input() user!: User;
  password = '';
  password2 = '';

  #modalCtrl = inject(ModalController);

  send() {
    this.#modalCtrl.dismiss({ user: this.user });
  }

  close() {
    this.#modalCtrl.dismiss();
  }
}