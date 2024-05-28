import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  NavController,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { UserLogin } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    IonLabel,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
  ],
})
export class LoginPage {
  email = '';
  password = '';

  #authService = inject(AuthService);
  #alertCtrl = inject(AlertController);
  #navCtrl = inject(NavController);

  login() {
    const userLogin: UserLogin = {
      email: this.email,
      password: this.password,
    };
   
     this.#authService.login(userLogin).subscribe(
       () => {
         this.#navCtrl.navigateRoot(['/tabs/home']);
       },
       async (error) => {
         const alert = await this.#alertCtrl.create({
           header: 'Login error',
           message: 'Incorrect email and/or password',
           buttons: ['Ok'],
         });
         await alert.present();
       }
     );
  }

}