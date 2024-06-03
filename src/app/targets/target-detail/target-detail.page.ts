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
import { Target } from '../interfaces/target';
import { TargetService } from '../services/target.service';
import { TargetDetailModalComponent } from './target-detail-modal/target-detail-modal.component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TargetCategoryService } from 'src/app/targetCategories/services/targetCategory.service';
@Component({
  selector: 'target-detail',
  templateUrl: './target-detail.page.html',
  styleUrls: ['./target-detail.page.scss'],
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
export class TargetDetailPage {
  target!: Target;

  #targetService = inject(TargetService);
  #targetCategoryService = inject(TargetCategoryService);

  #nav = inject(NavController);
  #toastCtrl = inject(ToastController);
  #modalCtrl = inject(ModalController);
  #activatedRoute = inject(ActivatedRoute);
  ionViewWillEnter() {
    this.#activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.#targetService
        .getTargetById(id)
        .subscribe((target) => {
          if (target) {
            this.target = target;
            this.#targetCategoryService
              .getTargetCategoryById(target.target_category_id!)
              .subscribe((targetCategory) => {
                target.target_category_name =
                  targetCategory.name;
              });
          } else {
            console.error('No se encontró ninguna transacción con el ID:', id);
          }
        });
    });
  }

  reloadtargetInfo(refresher: IonRefresher) {
    this.#targetService
      .getTargetById(this.target.id!)
      .subscribe((target) => {
        if (target) {
          this.target = target;
          this.#targetCategoryService
            .getTargetCategoryById(target.target_category_id!)
            .subscribe((targetCategory) => {
              target.target_category_name = targetCategory.name;
              refresher.complete();
            });
            refresher.complete();
        } else {
          console.error(
            'No se encontró ninguna transacción con el ID:',
            this.target.id
          );
        }
      });
  }

  deleteTarget(target_id: number) {
    this.#targetService.deleteTarget(target_id).subscribe(
      async (target) => {
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'Target deleted succesfully',
            color: 'success',
          })
        ).present();
        this.#nav.navigateRoot(['/tabs/targets']);
      },
      async (error) =>
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'Error deleting target',
          })
        ).present()
    );
  }

  async openTargetDetailModal() {
    const modal = await this.#modalCtrl.create({
      component: TargetDetailModalComponent,
      componentProps: { target: { ...this.target } }, // Clone the target object
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data) {
      this.target = result.data.target;
      try {
        await this.#targetService
          .editTarget(this.target.id!, {
            name: result.data.target.name,
            current_amount: result.data.current_amount,
            target_amount: result.data.target_amount,
            target_category_id: result.data.target.target_category_id,
            user_id: result.data.target.user_id!,
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
