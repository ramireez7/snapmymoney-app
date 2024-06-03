import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController, IonSelect, IonSelectOption, } from '@ionic/angular/standalone';
import { Target } from '../../interfaces/target';
import { TargetCategory } from 'src/app/targetCategories/interfaces/targetCategory';
import { TargetCategoryService } from 'src/app/targetCategories/services/targetCategory.service';

@Component({
  selector: 'target-modal',
  templateUrl: './target-detail-modal.component.html',
  styleUrls: ['./target-detail-modal.component.scss'],
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
export class TargetDetailModalComponent {
  @Input() target!: Target;

  targetCategories!: TargetCategory[];
  #targetCategoryService = inject(TargetCategoryService);
  #modalCtrl = inject(ModalController);

  ionViewWillEnter() {
    this.#targetCategoryService
      .getTargetCategories()
      .subscribe((targetCategories) => {
        this.targetCategories = targetCategories;
      });
  }

  send() {
    this.#modalCtrl.dismiss({ target: this.target });
  }

  close() {
    this.#modalCtrl.dismiss();
  }
}
