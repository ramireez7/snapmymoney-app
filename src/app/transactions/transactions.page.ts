import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonThumbnail, IonLabel, IonList, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonButton } from '@ionic/angular/standalone';
import { TransactionService } from './services/transaction.service';
import { Transaction } from './interfaces/transaction';
import { CurrencyPipe } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'transactions',
  templateUrl: 'transactions.page.html',
  styleUrls: ['transactions.page.scss'],
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
    CurrencyPipe,
    IonButton,
    RouterLink,
    RouterLinkActive
  ],
})
export class TransactionsPage {
  transactions: Transaction[] = [];
  #transactionsService = inject(TransactionService);

  ionViewWillEnter() {
    Preferences.get({ key: 'user-id' })
      .then((result) => {
        const userId = result.value;
        this.#transactionsService
          .getTransactionsByUserId(Number(userId))
          .subscribe((transactions) => {
            this.transactions = transactions;
          });
      })
      .catch((error) => {
        console.error('Error al obtener user-id de Preferences:', error);
      });
  }
}
