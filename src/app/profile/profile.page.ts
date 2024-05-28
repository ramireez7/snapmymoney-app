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
import { User } from '../auth/interfaces/user';
import { AuthService } from '../auth/services/auth.service';
import { ProfileModalComponent } from './modals/profile-modal/profile-modal.component';
import { PasswordModalComponent } from './modals/password-modal/password-modal.component';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
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
  ],
})
export class ProfilePage {
  user!: User;

  #authService = inject(AuthService);
  #nav = inject(NavController);
  #toastCtrl = inject(ToastController);

  #profileService = inject(ProfileService);
  #modalCtrl = inject(ModalController);

  ionViewWillEnter() {
    this.#authService.getProfile().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  reloadProfileInfo(refresher: IonRefresher) {
    this.#profileService.getProfileById(this.user.id!).subscribe((user) => {
      this.user = user;
      refresher.complete();
    });
  }

  async openProfileModal() {
    const modal = await this.#modalCtrl.create({
      component: ProfileModalComponent,
      componentProps: { user: { ...this.user } }, // Clone the user object
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data) {
      this.user = result.data.user;
      try {
        await this.#profileService
          .saveProfile({
            name: result.data.user.name,
            email: result.data.user.email,
          }, result.data.user.id!)
          .subscribe();
        this.presentToast('Profile updated successfully!', 'success');
      } catch (error) {
        this.presentToast('An error ocurred updating the profile', 'error');
      }
    }
  }

  async openPasswordModal() {
    const modal = await this.#modalCtrl.create({
      component: PasswordModalComponent,
      componentProps: { user: { ...this.user } }, // Clone the user object
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    if (result.data) {
      this.user = result.data.user;
      try {
        await this.#profileService
          .savePassword({ password: result.data.user.password })
          .subscribe();
        this.presentToast('Password updated successfully!', 'success');
      } catch (error) {
        this.presentToast('An error ocurred changing the password', 'error');
      }
    }
  }

  async presentToast(message: string, messageType: 'success' | 'error') {
    const toast = await this.#toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: messageType === 'success' ? 'success' : 'danger',
    });
    toast.present();
  }

  async logout() {
    await this.#authService.logout();
    this.#nav.navigateRoot(['/auth/login']);
  }
}
