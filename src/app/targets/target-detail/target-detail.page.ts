import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
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
  IonProgressBar
} from '@ionic/angular/standalone';
import { Target } from '../interfaces/target';
import { TargetService } from '../services/target.service';
import { TargetDetailModalComponent } from './target-detail-modal/target-detail-modal.component';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { TargetCategoryService } from 'src/app/targetCategories/services/targetCategory.service';
import { TargetAmountModalComponent } from './target-amount-modal/target-amount-modal.component';
import { RemoveTargetAmountModalComponent } from './remove-target-amount-modal copy/remove-target-amount-modal.component';
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
    IonProgressBar,
    DecimalPipe,
  ],
})
export class TargetDetailPage {
  target!: Target;
  percentage: number = 0;

  #targetService = inject(TargetService);
  #targetCategoryService = inject(TargetCategoryService);

  #nav = inject(NavController);
  #toastCtrl = inject(ToastController);
  #modalCtrl = inject(ModalController);
  #activatedRoute = inject(ActivatedRoute);
  ionViewWillEnter() {
    this.#activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.#targetService.getTargetById(id).subscribe((target) => {
        if (target) {
          this.target = target;
          this.percentage = (target.current_amount! / target.target_amount!) * 100;
          this.percentage = parseFloat(this.percentage.toFixed(0));

          this.#targetCategoryService
            .getTargetCategoryById(target.target_category_id!)
            .subscribe((targetCategory) => {
              target.target_category_name = targetCategory.name;
            });
        } else {
          console.error('No se encontró ninguna transacción con el ID:', id);
        }
      });
    });
  }

  reloadtargetInfo(refresher: IonRefresher) {
    this.#targetService.getTargetById(this.target.id!).subscribe((target) => {
      if (target) {
        this.target = target;
        if(target.target_category_id){
          this.#targetCategoryService
          .getTargetCategoryById(target.target_category_id!)
          .subscribe((targetCategory) => {
            target.target_category_name = targetCategory.name;
          });
        } else {
          target.target_category_name = 'Sin categoría';
        }
        this.percentage = (target.current_amount! / target.target_amount!) * 100;
        this.percentage = parseFloat(this.percentage.toFixed(0));
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
            message: 'Objetivo eliminado con éxito!',
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
            message: 'Ha ocurrido un error eliminando el objetivo',
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
            name: this.target.name,
            target_amount: this.target.target_amount,
            target_category_id: this.target.target_category_id,
            user_id: this.target.user_id!,
          })
          .subscribe((target) => {
            this.percentage = (target.current_amount! / target.target_amount!) * 100;
            this.percentage = parseFloat(this.percentage.toFixed(0));
          });
        this.presentToast('Objetivo actualizado con éxito!', 'success');
      } catch (error) {
        this.presentToast(
          'Ha ocurrido un error actualizando el objetivo',
          'error'
        );
      }
    }
  }

  async openTargetAmountModal() {
    const modal = await this.#modalCtrl.create({
      component: TargetAmountModalComponent,
      componentProps: { target: { ...this.target } }, // Clone the target object
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data) {
      this.target = result.data.target;
      try {
        await this.#targetService
          .updateTargetAmount(this.target.id!, {
            amount: result.data.amount,
            remove: 0
          })
          .subscribe((target) => {
            this.percentage = (target.current_amount! / target.target_amount!) * 100;
            this.percentage = parseFloat(this.percentage.toFixed(0));
          });
        this.presentToast('Cantidad ahorrada modificada con éxito!', 'success');
      } catch (error) {
        this.presentToast(
          'Ha ocurrido un error actualizando el objetivo',
          'error'
        );
      }
    }
  }

  async openRemoveTargetAmountModal() {
    const modal = await this.#modalCtrl.create({
      component: RemoveTargetAmountModalComponent,
      componentProps: { target: { ...this.target } }, // Clone the target object
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data) {
      this.target = result.data.target;
      try {
        await this.#targetService
          .updateTargetAmount(this.target.id!, {
            amount: result.data.amount,
            remove: 1
          })
          .subscribe((target) => {
            this.percentage = (target.current_amount! / target.target_amount!) * 100;
            this.percentage = parseFloat(this.percentage.toFixed(0));
          });
        this.presentToast('Cantidad ahorrada modificada con éxito!', 'success');
      } catch (error) {
        this.presentToast(
          'Ha ocurrido un error actualizando el objetivo',
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
