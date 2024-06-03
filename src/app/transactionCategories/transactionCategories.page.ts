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
import { TransactionCategoryService } from './services/transactionCategory.service';
import { TransactionCategory } from './interfaces/transactionCategory';
import { Preferences } from '@capacitor/preferences';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'transactionCategories',
  templateUrl: 'transactionCategories.page.html',
  styleUrls: ['transactionCategories.page.scss'],
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
export class TransactionCategoriesPage {
  transactionCategories: TransactionCategory[] = [];
  #transactionCategoriesService = inject(TransactionCategoryService);

  ionViewWillEnter() {
    Preferences.get({ key: 'user-id' })
      .then((result) => {
        const userId = result.value;
        this.#transactionCategoriesService
          .getTransactionCategoriesByUserId(Number(userId))
          .subscribe((transactionCategories) => {
            this.transactionCategories = transactionCategories;
          });
      })
      .catch((error) => {
        console.error('Error al obtener user-id de Preferences:', error);
      });
  }
}
