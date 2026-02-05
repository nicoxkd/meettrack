import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReunionesService } from '../reuniones/views/services/reuniones.service';

interface Meeting {
  id_reunion: string;
  id_alumno: string;
  date: string; // ISO format for logic
  displayDate: string; // Formatted for UI
  time: string;
  studentName: string;
  estado: string;
  statusLabel: string;
  canFillActa: boolean;
}

@Component({
  selector: 'app-proximas-reuniones-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proximas-reuniones-profesor.component.html',
  styleUrls: ['./proximas-reuniones-profesor.component.scss']
})
export class ProximasReunionesProfesorComponent implements OnInit {

  meetings: Meeting[] = [];
  loading: boolean = true;

  constructor(
    private reunionesService: ReunionesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const dni = localStorage.getItem('dni');
    if (dni) {
      this.cargarReuniones(dni);
    }
  }

  cargarReuniones(dni: string) {
    this.reunionesService.getReunionesProfesor(dni).subscribe({
      next: (data: any[]) => {
        const now = new Date();

        this.meetings = data
          .map(m => {
            const horaInicio = m.hora.split(' - ')[0];
            const [horas, minutos] = horaInicio.split(':');
            const fechaReunion = new Date(m.fecha);
            if (horas && minutos) {
              fechaReunion.setHours(parseInt(horas), parseInt(minutos), 0);
            }

            const unaHoraDespues = new Date(fechaReunion.getTime() + 60 * 60 * 1000);
            let statusLabel = '';

            if (now < fechaReunion) {
              statusLabel = 'proximamente';
            } else if (now >= fechaReunion && now <= unaHoraDespues) {
              statusLabel = 'en-curso';
            } else {
              statusLabel = 'pasada';
            }

            return {
              id_reunion: m.id_reunion,
              id_alumno: m.dni_alumno,
              date: m.fecha,
              displayDate: new Date(m.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long' }),
              time: m.hora,
              studentName: m.nombre_alumno || 'Alumno desconocido',
              estado: m.estado,
              statusLabel: statusLabel,
              canFillActa: false // Inhabilitamos en esta vista
            };
          })
          .filter(m => m.statusLabel !== 'pasada' && m.estado !== 'finalizada');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar próximas reuniones', err);
        this.loading = false;
      }
    });
  }

}