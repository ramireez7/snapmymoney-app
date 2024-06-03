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
import { TransactionCategoryService } from '../services/transactionCategory.service';
import { TransactionCategoryInsert } from '../interfaces/transactionCategory';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'transactionCategory-form',
  templateUrl: './transactionCategory-form.page.html',
  styleUrls: ['./transactionCategory-form.page.scss'],
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
export class TransactionCategoryFormPage {
  user!: User;

  newTransactionCategory: TransactionCategoryInsert = {
    name: '',
    user_id: 0,
  };

  #authService = inject(AuthService);
  #transactionCategoryService = inject(TransactionCategoryService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);

  ionViewWillEnter() {
    this.#authService.getProfile().subscribe((user) => {
      this.user = user;
      this.newTransactionCategory.user_id = this.user.id!;
    });
  }

  addTransactionCategory() {
    const transactionCategory: TransactionCategoryInsert = {
      name: this.newTransactionCategory.name,
      user_id: this.newTransactionCategory.user_id,
    };
    this.#transactionCategoryService.addTransactionCategory(transactionCategory).subscribe(
      async (transactionCategory) => {
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'TransactionCategory added succesfully',
            color: 'success',
          })
        ).present();
        this.#nav.navigateRoot(['/transactionCategories']);
      },
      async (error) =>
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'Error adding transactionCategory',
          })
        ).present()
    );
  }

  transactionCategoryFormValid() {
    if (
      !this.newTransactionCategory.name|| 
      !this.newTransactionCategory.user_id
    ) {
      return false;
    } else {
      return true;
    }
  }
}
