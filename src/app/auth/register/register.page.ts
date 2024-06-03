import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonRouterLink,
  ToastController,
  NavController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonIcon,
  IonImg,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
} from '@ionic/angular/standalone';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { ValueEqualsDirective } from 'src/app/validators/value-equals.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonIcon,
    IonImg,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    ValueEqualsDirective
  ],
})
export class RegisterPage {
  user: User = {
    name: '',
    password: '',
    email: '',
  };
  password2 = '';

  #authService = inject(AuthService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);

  register() {
    this.#authService.register(this.user).subscribe(async () => {
      (
        await this.#toastCtrl.create({
          duration: 2000,
          position: 'bottom',
          message: 'User registered!',
        })
      ).present();
      this.#nav.navigateRoot(['/auth/login']);
    });
  }
}
