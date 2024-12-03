import { Itemlistcliente, ItemListConductor } from '../../interfaces/itemlist';
import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  vinculos: Itemlistcliente[] = [{
    ruta: '/solicitar-viaje',
    titulo: 'Solicitar viaje',
    icono: 'add'
  },
  ];

  vinculoConductor: ItemListConductor[] = [{
    rutaconductor: '/crear-viajes',
    tituloconductor: 'Crear viaje',
    iconoconductor: 'car'
  },
  {
    rutaconductor: '/historial',
    tituloconductor: 'Historial Conductor',
    iconoconductor: 'person'
  },
  ];

  constructor(private router: Router) { }

  ngOnInit() {

  }


  logout() {
    this.router.navigate(['']);
  }

  onConductor() {
    this.router.navigate(['/conductor'])
  }
}
