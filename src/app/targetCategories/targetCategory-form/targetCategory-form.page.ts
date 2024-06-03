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
import { TargetCategoryService } from '../services/targetCategory.service';
import { TargetCategoryInsert } from '../interfaces/targetCategory';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'targetCategory-form',
  templateUrl: './targetCategory-form.page.html',
  styleUrls: ['./targetCategory-form.page.scss'],
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
export class TargetCategoryFormPage {
  user!: User;

  newTargetCategory: TargetCategoryInsert = {
    name: '',
    user_id: 0,
  };

  #authService = inject(AuthService);
  #targetCategoryService = inject(TargetCategoryService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);

  ionViewWillEnter() {
    this.#authService.getProfile().subscribe((user) => {
      this.user = user;
      this.newTargetCategory.user_id = this.user.id!;
    });
  }

  addTargetCategory() {
    const targetCategory: TargetCategoryInsert = {
      name: this.newTargetCategory.name,
      user_id: this.newTargetCategory.user_id,
    };
    this.#targetCategoryService.addTargetCategory(targetCategory).subscribe(
      async (targetCategory) => {
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'TargetCategory added succesfully',
            color: 'success',
          })
        ).present();
        this.#nav.navigateRoot(['/targetCategories']);
      },
      async (error) =>
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 2000,
            message: 'Error adding targetCategory',
          })
        ).present()
    );
  }

  targetCategoryFormValid() {
    if (
      !this.newTargetCategory.name ||
      !this.newTargetCategory.user_id
    ) {
      return false;
    } else {
      return true;
    }
  }
}
