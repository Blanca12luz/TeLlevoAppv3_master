import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-solicitar-viaje',
  templateUrl: './solicitar-viaje.page.html',
  styleUrls: ['./solicitar-viaje.page.scss'],
})
export class SolicitarViajePage implements OnInit {
  public viajes: any[] = []; // Lista de viajes obtenidos desde Firebase

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.obtenerViajes();
  }

  /**
   * Método para obtener los viajes desde Firebase
   */
  obtenerViajes() {
    this.firestore
      .collection('viajes') // Nombre de la colección en Firebase
      .valueChanges({ idField: 'id' }) // Recuperar datos con ID
      .subscribe(
        (data: any[]) => {
          this.viajes = data;
          console.log('Viajes obtenidos:', this.viajes);
        },
        (error) => {
          console.error('Error al obtener viajes:', error);
        }
      );
  }

  /**
   * Método para manejar la selección de un viaje
   * @param viaje El viaje seleccionado
   */
  seleccionarViaje(viaje: any) {
    console.log('Viaje seleccionado:', viaje);
  
    const notificacion = {
      mensaje: `El usuario ha solicitado el viaje a ${viaje.destino.lat}, ${viaje.destino.lng}`,
      fecha: new Date(),
      receptorId: viaje.creadorId, // Enviar la notificación al creador
      solicitanteId: 'user456', // Reemplazar con el UID del usuario solicitante
    };
  
    this.firestore
      .collection('notificaciones')
      .add(notificacion)
      .then(() => {
        console.log('Notificación enviada correctamente.');
      })
      .catch((error) => {
        console.error('Error al enviar la notificación:', error);
      });
  }
  
}