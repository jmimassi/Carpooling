import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }


  onSignin() {
    // Implémentez ici la logique de connexion
    console.log('Connexion en cours...');
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.password);
  }
}
