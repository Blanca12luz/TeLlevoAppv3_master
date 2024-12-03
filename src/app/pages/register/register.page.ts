import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      try {
        // Registrar el usuario en Firebase Authentication
        const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);

        // Guardar información adicional del usuario en Firestore
        await this.firestore.collection('users').doc(userCredential.user?.uid).set({
          name,
          email,
        });

        alert('¡Registro exitoso!');
        this.navCtrl.navigateBack('/login');
      } catch (error) {
        console.error('Error al registrar:', error);
        alert('Hubo un error al registrar. Por favor, intenta nuevamente.');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
