import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReunionesService } from '../reuniones/views/services/reuniones.service';

interface Meeting {
  id_reunion: string;
  id_alumno: string;
  date: string;
  displayDate: string;
  time: string;
  studentName: string;
  estado: string;
}

@Component({
  selector: 'app-reuniones-pasadas-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reuniones-pasadas-profesor.component.html',
  styleUrls: ['./reuniones-pasadas-profesor.component.scss']
})
export class ReunionesPasadasProfesorComponent implements OnInit {
  meetings: Meeting[] = [];
  filteredMeetings: Meeting[] = [];
  searchTerm: string = '';
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
            const esPasada = now > unaHoraDespues;

            return {
              id_reunion: m.id_reunion,
              id_alumno: m.dni_alumno,
              date: m.fecha,
              displayDate: new Date(m.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
              time: m.hora,
              studentName: m.nombre_alumno || 'Alumno desconocido',
              estado: m.estado,
              isPasada: esPasada
            };
          })
          .filter(m => m.isPasada);

        this.filteredMeetings = [...this.meetings];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar reuniones pasadas', err);
        this.loading = false;
      }
    });
  }

  filterMeetings(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredMeetings = this.meetings.filter(m =>
      m.studentName.toLowerCase().includes(term) ||
      m.displayDate.includes(term)
    );
  }

  rellenarActa(meeting: Meeting) {
    this.router.navigate(['/rellenar-acta'], {
      queryParams: {
        idReunion: meeting.id_reunion,
        dniAlumno: meeting.id_alumno,
        nombreAlumno: meeting.studentName,
        fecha: meeting.displayDate,
        hora: meeting.time
      }
    });
  }
}