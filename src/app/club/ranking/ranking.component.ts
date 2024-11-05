import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

interface Usuario {
  nombre: string;
  puntos: number;
}
@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})

export class RankingComponent {
  rankingUsuarios: Usuario[] = [
    { nombre: 'Pepito Pérez', puntos: 3300 },
    { nombre: 'Pepito Pérez', puntos: 3200 },
    { nombre: 'Pepito Pérez', puntos: 3100 },
    { nombre: 'Pepito Pérez', puntos: 3000 },
    { nombre: 'Pepito Pérez', puntos: 2900 }
  ];

  solicitudesUsuarios: Usuario[] = [
    { nombre: 'Juan García', puntos: 2800 },
    { nombre: 'María López', puntos: 2700 },
    { nombre: 'Carlos Martínez', puntos: 2600 }
  ];

  vistaActual: 'ranking' | 'solicitudes' = 'ranking';

  cambiarVista(vista: 'ranking' | 'solicitudes') {
    this.vistaActual = vista;
  }

  rechazarSolicitud(usuario: Usuario) {

  }

  aceptarSolicitud(usuario: Usuario) {

  }
}
