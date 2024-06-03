import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonProgressBar,
  IonButton
} from '@ionic/angular/standalone';
import { TransactionTypeService } from '../transactionTypes/services/transactionType.service';
import { TransactionType } from '../transactionTypes/interfaces/transactionType';
import { Preferences } from '@capacitor/preferences';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'transactionTypes',
  templateUrl: 'transactionTypes.page.html',
  styleUrls: ['transactionTypes.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonFab,
    IonFabButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonProgressBar,
    RouterLink,
    RouterLinkActive,
    IonButton,
  ],
})
export class TransactionTypesPage {
  transactionTypes: TransactionType[] = [];
  #transactionTypesService = inject(TransactionTypeService);

  ionViewWillEnter() {
    Preferences.get({ key: 'user-id' })
      .then((result) => {
        const userId = result.value;
        this.#transactionTypesService
          .getTransactionTypesByUserId(Number(userId))
          .subscribe((transactionTypes) => {
            this.transactionTypes = transactionTypes;
          });
      })
      .catch((error) => {
        console.error('Error al obtener user-id de Preferences:', error);
      });
  }
}
