import { Component, OnInit } from '@angular/core';
import { ReunionesService } from './services/reuniones.service';

interface Meeting {
  id?: string;
  date: string;
  subject: string;
  teacher: string;
}

interface Filter {
  label: string;
  value: string;
}

@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrls: ['./reuniones.component.scss']
})
export class ReunionesComponent implements OnInit {

  meetings: Meeting[] = [];
  filteredMeetings: Meeting[] = [];

  filters: Filter[] = [
    { label: 'Hoy', value: 'hoy' },
    { label: 'Esta semana', value: 'semana' },
    { label: 'Este mes', value: 'mes' }
  ];

  searchTerm: string = '';
  activeFilter: string | null = null;
  cargando: boolean = true;

  constructor(private reunionesService: ReunionesService) { }

  ngOnInit(): void {
    this.cargarReunionesReales();
  }

  cargarReunionesReales() {
    const dni = localStorage.getItem('dni');
    if (!dni) {
      this.cargando = false;
      return;
    }

    this.reunionesService.getReunionesAlumno(dni).subscribe({
      next: (datosBackend: any[]) => {
        this.meetings = datosBackend.map(item => ({
          id: item.id_reunion,
          date: item.fecha,
          subject: 'Reunión Programada',
          teacher: item.nombre_profesor ? `${item.nombre_profesor} ${item.apellidos_profesor}` : 'Profesor'
        }));

        this.filteredMeetings = [...this.meetings];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando reuniones', err);
        this.cargando = false;
      }
    });
  }

  toggleFilter(filterValue: string): void {
    if (this.activeFilter === filterValue) {
      this.activeFilter = null;
    } else {
      this.activeFilter = filterValue;
    }
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.meetings];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(m =>
        m.date.toLowerCase().includes(term) ||
        m.subject.toLowerCase().includes(term) ||
        m.teacher.toLowerCase().includes(term)
      );
    }

    if (this.activeFilter) {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filtered = filtered.filter(m => {
        const meetingDate = new Date(m.date);

        if (this.activeFilter === 'hoy') {
          return meetingDate.getDate() === now.getDate() &&
            meetingDate.getMonth() === now.getMonth() &&
            meetingDate.getFullYear() === now.getFullYear();
        }

        else if (this.activeFilter === 'semana') {
          const day = startOfDay.getDay() || 7;
          if (day !== 1) startOfDay.setHours(-24 * (day - 1));
          const endOfWeek = new Date(startOfDay);
          endOfWeek.setHours(24 * 6 + 23, 59, 59, 999);

          return meetingDate >= startOfDay && meetingDate <= endOfWeek;
        }

        else if (this.activeFilter === 'mes') {
          return meetingDate.getMonth() === now.getMonth() &&
            meetingDate.getFullYear() === now.getFullYear();
        }

        return true;
      });
    }

    this.filteredMeetings = filtered;
  }

  cancelMeeting(meeting: Meeting): void {
    const confirmCancel = confirm(`¿Estás seguro de que quieres cancelar la reunión de ${meeting.subject}?`);

    if (confirmCancel && meeting.id) {
      this.reunionesService.cancelarReunion(meeting.id).subscribe({
        next: () => {
          this.meetings = this.meetings.filter(m => m.id !== meeting.id);
          this.filteredMeetings = this.filteredMeetings.filter(m => m.id !== meeting.id);
          alert('Reunión cancelada correctamente.');
        },
        error: (err) => {
          console.error('Error al cancelar', err);
          alert('No se pudo cancelar la reunión. Inténtalo luego.');
        }
      });
    }
  }
}
