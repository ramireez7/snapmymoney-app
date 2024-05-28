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
import { TargetService } from './services/target.service';
import { Target } from './interfaces/target';
import { Preferences } from '@capacitor/preferences';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
    IonButton
  ],
})
export class TargetsPage {
  targets: Target[] = [];
  #targetsService = inject(TargetService);

  ionViewWillEnter() {
    Preferences.get({ key: 'user-id' })
      .then((result) => {
        const userId = result.value;
        this.#targetsService
          .getTargetsByUserId(Number(userId))
          .subscribe((targets) => {
            this.targets = targets;
          });
      })
      .catch((error) => {
        console.error('Error al obtener user-id de Preferences:', error);
      });
  }
}
