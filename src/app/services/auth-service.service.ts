import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private auth: AngularFireAuth) { }
  getUser() {
    return this.auth.authState; // Devuelve el usuario autenticado
  }

  logout() {
    return this.auth.signOut();
  }
}
