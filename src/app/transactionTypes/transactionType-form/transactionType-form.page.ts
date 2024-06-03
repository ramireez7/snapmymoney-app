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
import { TransactionTypeService } from '../../transactionTypes/services/transactionType.service';
import { TransactionTypeInsert } from '../../transactionTypes/interfaces/transactionType';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'transactionType-form',
  templateUrl: './transactionType-form.page.html',
  styleUrls: ['./transactionType-form.page.scss'],
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
export class TransactionTypeFormPage {
  user!: User;

  newTransactionType: TransactionTypeInsert = {
    name: '',
    user_id: 0,
  };

  #authService = inject(AuthService);
  #transactionTypeService = inject(TransactionTypeService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);

  ionViewWillEnter() {
    this.#authService.getProfile().subscribe((user) => {
      this.user = user;
      this.newTransactionType.user_id = this.user.id!;
    });
  }

  addTransactionType() {
    const transactionType: TransactionTypeInsert = {
      name: this.newTransactionType.name,
      user_id: this.newTransactionType.user_id,
    };
    this.#transactionTypeService.addTransactionType(transactionType).subscribe(
      async (transactionType) => {
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'TransactionType added succesfully',
            color: 'success',
          })
        ).present();
        this.#nav.navigateRoot(['/transactionTypes']);
      },
      async (error) =>
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'Error adding transactionType',
          })
        ).present()
    );
  }

  transactionTypeFormValid() {
    if (
      !this.newTransactionType.name|| 
      !this.newTransactionType.user_id
    ) {
      return false;
    } else {
      return true;
    }
  }
}
