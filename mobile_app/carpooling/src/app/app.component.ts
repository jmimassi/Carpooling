import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public pages = [
    { title: 'Accueil', url: '/home', icon: 'home' },
    { title: 'Itinéraires', url: '/itinaries', icon: 'map' },
    { title: 'Mes Itinéraires', url: '/my-itinaries', icon: 'person' },
    { title: 'Inscription', url: '/signup', icon: 'person-add' },
    { title: 'Connexion', url: '/signin', icon: 'log-in' },
    // Ajoutez d'autres pages ici
  ];

  constructor(private navCtrl: NavController) { }

  navigateTo(url: string) {
    this.navCtrl.navigateForward(url);
  }
}
