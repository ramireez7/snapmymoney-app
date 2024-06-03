import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController, IonSelect, IonSelectOption, } from '@ionic/angular/standalone';
import { Transaction } from '../../interfaces/transaction';
import { TransactionCategory } from 'src/app/transactionCategories/interfaces/transactionCategory';
import { TransactionCategoryService } from 'src/app/transactionCategories/services/transactionCategory.service';
import { TransactionTypeService } from 'src/app/transactionTypes/services/transactionType.service';
import { TransactionType } from 'src/app/transactionTypes/interfaces/transactionType';

@Component({
  selector: 'transaction-modal',
  templateUrl: './transaction-detail-modal.component.html',
  styleUrls: ['./transaction-detail-modal.component.scss'],
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
    IonSelect,
    IonSelectOption,
  ],
})
export class TransactionDetailModalComponent {
  @Input() transaction!: Transaction;

  transactionCategories!: TransactionCategory[];
  transactionTypes!: TransactionType[]; 
  #transactionCategoryService = inject(TransactionCategoryService);
  #transactionTypeService = inject(TransactionTypeService);
  #modalCtrl = inject(ModalController);

  ionViewWillEnter() {
    this.#transactionCategoryService
      .getTransactionCategories()
      .subscribe((transactionCategories) => {
        this.transactionCategories = transactionCategories;
      });

    this.#transactionTypeService
      .getTransactionTypes()
      .subscribe((transactionTypes) => {
        this.transactionTypes = transactionTypes;
      });
  }

  send() {
    this.#modalCtrl.dismiss({ transaction: this.transaction });
  }

  close() {
    this.#modalCtrl.dismiss();
  }
}
