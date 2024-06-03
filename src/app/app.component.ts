import { Component, effect, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform, NavController } from '@ionic/angular/standalone';
import { User } from './auth/interfaces/user';
import { AuthService } from './auth/services/auth.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { addIcons } from 'ionicons';
import { cashOutline, homeOutline, personOutline, rocketOutline, add, arrowUndoCircle, documentText, logIn, exit, lockClosedOutline, createOutline, checkmarkCircle, saveOutline, close, menu, eye, pencil, trashSharp } from 'ionicons/icons';

@Component({
  selector: 'root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  user: User | null = null;

  #authService = inject(AuthService);
  #platform = inject(Platform);

  constructor() {
        addIcons({
          homeOutline,
          cashOutline,
          personOutline,
          rocketOutline,
          add,
          arrowUndoCircle,
          documentText,
          logIn,
          exit,
          lockClosedOutline,
          createOutline,
          checkmarkCircle,
          saveOutline,
          close,
          menu,
          eye,
          pencil,
          trashSharp
        });

    effect(() => {
      if (this.#authService.logged()) {
        this.#authService.getProfile().subscribe((user) => (this.user = user));
      } else {
        this.user = null;
      }
    });

    this.initializeApp();
  }

  async initializeApp() {
    if (this.#platform.is('capacitor')) {
      await this.#platform.ready();
      SplashScreen.hide();
      StatusBar.setBackgroundColor({ color: '#3880ff' });
      StatusBar.setStyle({ style: Style.Dark });
    }
  }
}
