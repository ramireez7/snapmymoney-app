import { Component, Input, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonProgressBar,
  IonIcon
} from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/interfaces/user';
import { CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';
import { Transaction } from '../transactions/interfaces/transaction';
import { Target } from '../targets/interfaces/target';
import { TransactionService } from '../transactions/services/transaction.service';
import { TargetService } from '../targets/services/target.service';
import { TransactionCategoryService } from '../transactionCategories/services/transactionCategory.service';
@Component({
  selector: 'home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonImg,
    RouterLink,
    RouterLinkActive,
    IonProgressBar,
    CurrencyPipe,
    SlicePipe,
    DatePipe,
    IonIcon,
  ],
})
export class HomePage {
  user!: User;
  #authService = inject(AuthService);
  transactions: Transaction[] = [];
  #transactionsService = inject(TransactionService);
  #transactionCategoryService = inject(TransactionCategoryService);
  targets: Target[] = [];
  #targetsService = inject(TargetService);

  calculateBalance(transactions: Transaction[]): number {
    let balance = 0;
    transactions.forEach((transaction) => {
      const amount = Number(transaction.amount) ?? 0;
      if (transaction.transaction_type_id === 2) {
        balance += amount;
      } else {
        balance -= amount;
      }
    });
    return balance;
  }

  ionViewWillEnter() {
    this.#authService.getProfile().subscribe((user) => {
      this.user = user;

      this.#targetsService.getTargetsByUserId(user.id!).subscribe((targets) => {
        this.targets = targets;
      });

      this.#transactionsService
        .getTransactionsByUserId(user.id!)
        .subscribe((transactions) => {
          this.transactions = transactions;
          this.transactions.forEach((transaction) => {
            console.log(transaction);
            this.#transactionCategoryService
              .getTransactionCategoryById(transaction.transaction_category_id!)
              .subscribe((transactionCategory) => {
                transaction.transaction_category_name =
                  transactionCategory.name;
              });
          });
        });
    });
  }
}
