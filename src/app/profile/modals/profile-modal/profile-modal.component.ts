import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { User } from 'src/app/auth/interfaces/user';

@Component({
  selector: 'profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
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
  ],
})
export class ProfileModalComponent {
  @Input() user!: User;

  #modalCtrl = inject(ModalController);

  send() {
    this.#modalCtrl.dismiss({ user: this.user });
  }

  close() {
    this.#modalCtrl.dismiss();
  }
}
