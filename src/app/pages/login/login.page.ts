import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        await this.auth.signInWithEmailAndPassword(email, password);
        // Redirige al usuario a la página "home"
        this.navCtrl.navigateForward('/home');
      } catch (error: any) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('No existe un usuario con ese correo.');
            break;
          case 'auth/wrong-password':
            alert('Contraseña incorrecta.');
            break;
          case 'auth/invalid-email':
            alert('El formato del correo es inválido.');
            break;
          default:
            alert('Ocurrió un error. Intenta nuevamente.');
            console.error(error);
        }
      }
    }
  }
}
