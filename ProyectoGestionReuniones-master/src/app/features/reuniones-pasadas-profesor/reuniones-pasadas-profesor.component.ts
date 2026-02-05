import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReunionesService } from '../reuniones/views/services/reuniones.service';
import { ActasService } from '../actasPasadas/services/actas.service';
import { ModalService } from '../../shared/services/modal.service';
import { forkJoin } from 'rxjs';

interface Meeting {
  id_reunion: string;
  id_alumno: string;
  date: string;
  displayDate: string;
  time: string;
  studentName: string;
  estado: string;
  id_acta?: string;
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
    private actasService: ActasService,
    private router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    const dni = localStorage.getItem('dni');
    if (dni) {
      this.cargarReuniones(dni);
    }
  }

  cargarReuniones(dni: string) {
    this.loading = true;
    forkJoin({
      reuniones: this.reunionesService.getReunionesProfesor(dni),
      actas: this.actasService.getActasProfesor(dni)
    }).subscribe({
      next: ({ reuniones, actas }) => {
        const now = new Date();
        const merged: Meeting[] = [];
        const processedReunionIds = new Set<string>();

        // 1. Procesar reuniones (past or finalized)
        reuniones.forEach((m: any) => {
          const horaInicio = m.hora.split(' - ')[0];
          const [horas, minutos] = horaInicio.split(':');
          const fechaReunion = new Date(m.fecha);
          if (horas && minutos) {
            fechaReunion.setHours(parseInt(horas), parseInt(minutos), 0);
          }

          const unaHoraDespues = new Date(fechaReunion.getTime() + 60 * 60 * 1000);
          const esPasada = now > unaHoraDespues;

          if (esPasada || m.estado === 'finalizada') {
            merged.push({
              id_reunion: m.id_reunion,
              id_alumno: m.dni_alumno,
              date: m.fecha,
              displayDate: new Date(m.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
              time: m.hora,
              studentName: m.nombre_alumno || 'Alumno desconocido',
              estado: m.estado
            });
            processedReunionIds.add(m.id_reunion);
          }
        });

        // 2. Procesar actas que no tengan reunión en la lista (reuniones huérfanas o borradas)
        actas.forEach((a: any) => {
          if (!a.id_reunion || !processedReunionIds.has(a.id_reunion)) {
            merged.push({
              id_reunion: a.id_reunion || '',
              id_acta: a.id_acta,
              id_alumno: a.id_alumno,
              date: a.fecha_creacion,
              displayDate: new Date(a.fecha_creacion).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
              time: new Date(a.fecha_creacion).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
              studentName: a.nombre_alumno || 'Alumno desconocido',
              estado: 'finalizada'
            });
          }
        });

        this.meetings = merged;
        this.filteredMeetings = [...this.meetings];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar datos históricos', err);
        this.loading = false;
        this.modalService.alert('Error', 'No se pudieron cargar las reuniones pasadas.');
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