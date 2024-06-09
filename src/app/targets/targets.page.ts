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
  IonButton,
  IonRefresher,
  IonRefresherContent
} from '@ionic/angular/standalone';
import { TargetService } from './services/target.service';
import { Target } from './interfaces/target';
import { Preferences } from '@capacitor/preferences';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TargetCategoryService } from '../targetCategories/services/targetCategory.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'targets',
  templateUrl: 'targets.page.html',
  styleUrls: ['targets.page.scss'],
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
    CurrencyPipe,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class TargetsPage {
  targets: Target[] = [];
  #targetsService = inject(TargetService);
  #targetCategoryService = inject(TargetCategoryService);
  percentages: { [key: number]: number } = {};

  ionViewWillEnter() {
    Preferences.get({ key: 'user-id' })
      .then((result) => {
        const userId = result.value;
        this.#targetsService
          .getTargetsByUserId(Number(userId))
          .subscribe((targets) => {
            this.targets = targets;
            this.targets.forEach((target) => {
              if (target.target_category_id) {
                this.#targetCategoryService
                  .getTargetCategoryById(target.target_category_id!)
                  .subscribe((targetCategory) => {
                    target.target_category_name = targetCategory.name;
                  });
              } else {
                target.target_category_name = 'Sin categoría';
              }
              this.percentages[target.id!] = parseFloat(
                (
                  (target.current_amount! / target.target_amount!) *
                  100
                ).toFixed(0)
              );
            });
          });
      })
      .catch((error) => {
        console.error('Error al obtener user-id de Preferences:', error);
      });
  }

  reloadTargets(refresher: any) {
    Preferences.get({ key: 'user-id' })
      .then((result) => {
        const userId = result.value;
        this.#targetsService
          .getTargetsByUserId(Number(userId))
          .subscribe((targets) => {
            this.targets = targets;
            this.targets.forEach((target) => {
              if (target.target_category_id) {
                this.#targetCategoryService
                  .getTargetCategoryById(target.target_category_id!)
                  .subscribe((targetCategory) => {
                    target.target_category_name = targetCategory.name;
                  });
              }
              this.percentages[target.id!] = parseFloat(
                (
                  (target.current_amount! / target.target_amount!) *
                  100
                ).toFixed(0)
              );
            });
          });
      })
      .catch((error) => {
        console.error('Error al obtener user-id de Preferences:', error);
      });
  }
}
