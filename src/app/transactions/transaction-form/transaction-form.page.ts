import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ToastController,
  NavController,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
  IonItemDivider,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { TransactionService } from '../services/transaction.service';
import { TransactionInsert } from '../interfaces/transaction';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TransactionCategory } from 'src/app/transactionCategories/interfaces/transactionCategory';
import { TransactionCategoryService } from 'src/app/transactionCategories/services/transactionCategory.service';
import { TransactionType } from 'src/app/transactionTypes/interfaces/transactionType';
import { TransactionTypeService } from 'src/app/transactionTypes/services/transactionType.service';

@Component({
  selector: 'transaction-form',
  templateUrl: './transaction-form.page.html',
  styleUrls: ['./transaction-form.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonButton,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonLabel,
    IonItemDivider,
    IonRadio,
    IonRadioGroup,
    IonSelect,
    IonSelectOption,
  ],
})
export class TransactionFormPage {
  user!: User;
  transactionCategories!: TransactionCategory[];
  transactionTypes!: TransactionType[];

  newTransaction: TransactionInsert = {
    name: '',
    user_id: 0,
    amount: undefined,
    transaction_category_id: null,
  };

  #authService = inject(AuthService);
  #transactionService = inject(TransactionService);
  #transactionCategoryService = inject(TransactionCategoryService);
  #transactionTypeService = inject(TransactionTypeService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);

  ionViewWillEnter() {
    this.#authService.getProfile().subscribe((user) => {
      this.user = user;
      this.newTransaction.user_id = this.user.id!;
    });

    this.#transactionCategoryService.getTransactionCategories().subscribe((transactionCategories) => {
      this.transactionCategories = transactionCategories;
    });

    this.#transactionTypeService.getTransactionTypes().subscribe((transactionTypes) => {
      this.transactionTypes = transactionTypes;
    });
  }

  addTransaction() {
    const transaction: TransactionInsert = {
      name: this.newTransaction.name,
      user_id: this.newTransaction.user_id,
      amount: this.newTransaction.amount,
      transaction_category_id: this.newTransaction.transaction_category_id,
      transaction_type_id: this.newTransaction.transaction_type_id,
    };
    this.#transactionService.addTransaction(transaction).subscribe(
      async (transaction) => {
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'Transaction added succesfully',
            color: 'success',
          })
        ).present();
        this.#nav.navigateRoot(['/tabs/transactions']);
      },
      async (error) =>
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'Error adding transaction',
          })
        ).present()
    );
  }

  transactionFormValid() {
    if (
      !this.newTransaction.name ||
      !this.newTransaction.user_id ||
      !this.newTransaction.transaction_type_id ||
      !this.newTransaction.amount
    ) {
      return false;
    } else {
      return true;
    }
  }
}
