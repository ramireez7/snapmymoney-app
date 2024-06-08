import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonThumbnail, IonLabel, IonList, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { TransactionService } from './services/transaction.service';
import { Transaction } from './interfaces/transaction';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TransactionCategoryService } from '../transactionCategories/services/transactionCategory.service';

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
    RouterLinkActive,
    DatePipe,
    IonCol,
    RouterLink,
    RouterLinkActive,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class TransactionsPage {
  transactions: Transaction[] = [];
  #transactionService = inject(TransactionService);
  #transactionCategoryService = inject(TransactionCategoryService);

  ionViewWillEnter() {
    Preferences.get({ key: 'user-id' })
      .then((result) => {
        const userId = result.value;
        this.#transactionService
          .getTransactionsByUserId(Number(userId))
          .subscribe((transactions) => {
            this.transactions = transactions;
            this.transactions.forEach((transaction) => {
              if(transaction.transaction_category_id){
                this.#transactionCategoryService
                .getTransactionCategoryById(
                  transaction.transaction_category_id!
                )
                .subscribe((transactionCategory) => {
                  transaction.transaction_category_name =
                    transactionCategory.name;
                }); 
              }
            });
          });
      })
      .catch((error) => {
        console.error('Error al obtener user-id de Preferences:', error);
      });
  }

  reloadTransactions(refresher: any) {
    Preferences.get({ key: 'user-id' })
      .then((result) => {
        const userId = result.value;
        this.#transactionService
          .getTransactionsByUserId(Number(userId))
          .subscribe((transactions) => {
            this.transactions = transactions;
            this.transactions.forEach((transaction) => {
              this.#transactionCategoryService
                .getTransactionCategoryById(
                  transaction.transaction_category_id!
                )
                .subscribe((transactionCategory) => {
                  transaction.transaction_category_name =
                    transactionCategory.name;
                  refresher.complete();
                });
            });
          });
      })
      .catch((error) => {
        console.error('Error al obtener user-id de Preferences:', error);
      });
  }
}
