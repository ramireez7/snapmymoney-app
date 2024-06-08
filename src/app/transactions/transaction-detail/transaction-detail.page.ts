import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonItem,
  IonAvatar,
  IonImg,
  IonText,
  IonButton,
  IonIcon,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  NavController,
  IonGrid,
  IonRow,
  IonCol,
  ToastController,
  ModalController,
} from '@ionic/angular/standalone';
import { Transaction } from '../interfaces/transaction';
import { TransactionService } from '../services/transaction.service';
import { TransactionDetailModalComponent } from './transaction-detail-modal/transaction-detail-modal.component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TransactionCategoryService } from 'src/app/transactionCategories/services/transactionCategory.service';
@Component({
  selector: 'transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonRefresher,
    IonRefresherContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonItem,
    IonAvatar,
    IonImg,
    IonText,
    IonButton,
    IonIcon,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    RouterLink,
    RouterLinkActive,
  ],
})
export class TransactionDetailPage {
  transaction!: Transaction;

  #transactionService = inject(TransactionService);
  #transactionCategoryService = inject(TransactionCategoryService);

  #nav = inject(NavController);
  #toastCtrl = inject(ToastController);
  #modalCtrl = inject(ModalController);
  #activatedRoute = inject(ActivatedRoute);
  ionViewWillEnter() {
    this.#activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.#transactionService
        .getTransactionById(id)
        .subscribe((transaction) => {
          if (transaction) {
            this.transaction = transaction;
            if(transaction.transaction_category_id){
              this.#transactionCategoryService
              .getTransactionCategoryById(transaction.transaction_category_id!)
              .subscribe((transactionCategory) => {
                transaction.transaction_category_name =
                  transactionCategory.name;
              });
            }
          } else {
            console.error('No se encontró ninguna transacción con el ID:', id);
          }
        });
    });
  }

  reloadtransactionInfo(refresher: IonRefresher) {
    this.#transactionService
      .getTransactionById(this.transaction.id!)
      .subscribe((transaction) => {
        if (transaction) {
          this.transaction = transaction;
          this.#transactionCategoryService
            .getTransactionCategoryById(transaction.transaction_category_id!)
            .subscribe((transactionCategory) => {
              transaction.transaction_category_name = transactionCategory.name;
              refresher.complete();
            });
            refresher.complete();
        } else {
          console.error(
            'No se encontró ninguna transacción con el ID:',
            this.transaction.id
          );
        }
      });
  }

  deleteTransaction(transaction_id: number) {
    this.#transactionService.deleteTransaction(transaction_id).subscribe(
      async (transaction) => {
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'Transacción eliminada con éxito!',
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
            message: 'Ha ocurrdo un error eliminando la transacción',
          })
        ).present()
    );
  }

  async openTransactionDetailModal() {
    const modal = await this.#modalCtrl.create({
      component: TransactionDetailModalComponent,
      componentProps: { transaction: { ...this.transaction } }, // Clone the transaction object
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data) {
      this.transaction = result.data.transaction;
      try {
        await this.#transactionService
          .editTransaction(this.transaction.id!, {
            name: result.data.transaction.name,
            transaction_type_id: result.data.transaction.transaction_type_id,
            amount: result.data.transaction.amount,
            transaction_category_id:
              result.data.transaction.transaction_category_id,
            user_id: result.data.transaction.user_id!,
          })
          .subscribe();
        this.presentToast('Transacción actualizada con éxito!', 'success');
      } catch (error) {
        this.presentToast(
          'Ha ocurrido un error actualizando la transacción',
          'error'
        );
      }
    }
  }

  async presentToast(message: string, messageType: 'success' | 'error') {
    const toast = await this.#toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: messageType === 'success' ? 'success' : 'danger',
    });
    toast.present();
  }
}
