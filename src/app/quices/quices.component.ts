import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-quices',
  templateUrl: './quices.component.html',
  styleUrls: ['./quices.component.css']
})
export class QuicesComponent {
  questions = [
    { title: 'Primera pregunta', options: ['Respuesta 1', 'Respuesta 2', 'Respuesta 3', 'Respuesta 4'] },
    { title: 'Segunda pregunta', options: ['Respuesta 1', 'Respuesta 2', 'Respuesta 3', 'Respuesta 4'] },
    { title: 'Tercera pregunta', options: ['Respuesta 1', 'Respuesta 2', 'Respuesta 3', 'Respuesta 4'] },
    // Agrega más preguntas según sea necesario
  ];
}
