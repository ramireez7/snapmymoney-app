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
import { TargetService } from '../services/target.service';
import { TargetInsert } from '../interfaces/target';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TargetCategory } from 'src/app/targetCategories/interfaces/targetCategory';
import { TargetCategoryService } from 'src/app/targetCategories/services/targetCategory.service';

@Component({
  selector: 'target-form',
  templateUrl: './target-form.page.html',
  styleUrls: ['./target-form.page.scss'],
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
export class TargetFormPage {
  user!: User;
  targetCategories!: TargetCategory[];

  newTarget: TargetInsert = {
    name: '',
    user_id: 0,
    target_amount: 0,
    target_category_id: 0,
  };

  #authService = inject(AuthService);
  #targetService = inject(TargetService);
  #targetCategoryService = inject(TargetCategoryService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);

  inoViewWillEnter() {
    this.#authService.getProfile().subscribe((user) => {
      this.user = user;
      this.newTarget.user_id = this.user.id!;
    });

    this.#targetCategoryService.getTargetCategories().subscribe((targetCategories) => {
      this.targetCategories = targetCategories;
      console.log(targetCategories);
    });
  }

  addTarget() {
    const target: TargetInsert = {
      name: this.newTarget.name,
      user_id: this.newTarget.user_id,
      target_amount: this.newTarget.target_amount,
      target_category_id: this.newTarget.target_category_id,
    };
    this.#targetService.addTarget(target).subscribe(
      async (target) => {
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 3000,
            message: 'Target added succesfully',
            color: 'success',
          })
        ).present();
        this.#nav.navigateRoot(['/targets']);
      },
      async (error) =>
        (
          await this.#toastCtrl.create({
            position: 'bottom',
            duration: 3000,
            message: 'Error adding target',
          })
        ).present()
    );
  }

  targetFormValid() {
    if (
      !this.newTarget.name &&
      !this.newTarget.user_id &&
      !this.newTarget.target_amount
    ) {
      return false;
    } else {
      return true;
    }
  }
}
