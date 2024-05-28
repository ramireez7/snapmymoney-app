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
import { TargetCategoryService } from './services/targetCategory.service';
import { TargetCategory } from './interfaces/targetCategory';
import { Preferences } from '@capacitor/preferences';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'targetCategories',
  templateUrl: 'targetCategories.page.html',
  styleUrls: ['targetCategories.page.scss'],
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
export class TargetCategoriesPage {
  targetCategories: TargetCategory[] = [];
  #targetCategoriesService = inject(TargetCategoryService);

  ionViewWillEnter() {
    Preferences.get({ key: 'user-id' })
      .then((result) => {
        const userId = result.value;
        this.#targetCategoriesService
          .getTargetCategoriesByUserId(Number(userId))
          .subscribe((targetCategories) => {
            this.targetCategories = targetCategories;
          });
      })
      .catch((error) => {
        console.error('Error al obtener user-id de Preferences:', error);
      });
  }
}
