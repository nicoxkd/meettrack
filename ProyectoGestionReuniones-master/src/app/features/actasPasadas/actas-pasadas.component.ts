import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActasService } from './services/actas.service';

interface Meeting {
  id: string;
  id_reunion?: string;
  date: string;
  subject: string;
  detail: string;
}

@Component({
  selector: 'app-actas',
  templateUrl: './actas-pasadas.component.html',
  styleUrls: ['./actas-pasadas.component.scss']
})
export class ActasComponent implements OnInit {
  meetings: Meeting[] = [];
  selectedMeeting: Meeting | null = null;
  loading = true;

  constructor(
    private actasService: ActasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const dni = localStorage.getItem('dni');
    const role = localStorage.getItem('role');

    if (dni) {
      const fetchObs = role === 'profesor'
        ? this.actasService.getActasProfesor(dni)
        : this.actasService.getActasAlumno(dni);

      fetchObs.subscribe({
        next: (data) => {
          this.meetings = data.map((acta: any) => {
            let label = 'Reunión';
            if (role === 'profesor') {
              label = `Acta de ${acta.nombre_alumno || 'Alumno'} ${acta.apellidos_alumno || ''}`;
            } else {
              const nombreProf = acta.nombre_profesor ? `${acta.nombre_profesor} ${acta.apellidos_profesor}` : 'Profesor';
              label = `Reunión con ${nombreProf}`;
            }

            return {
              id: acta.id_acta,
              id_reunion: acta.id_reunion,
              date: acta.fecha_creacion,
              subject: label,
              detail: acta.contenido
            };
          });

          // Lógica de Selección Inteligente
          this.route.queryParams.subscribe(params => {
            const targetIdReunion = params['idReunion'];
            if (targetIdReunion) {
              const found = this.meetings.find(m => m.id_reunion === targetIdReunion);
              if (found) {
                this.selectedMeeting = found;
              } else if (this.meetings.length > 0) {
                this.selectedMeeting = this.meetings[0];
              }
            } else if (this.meetings.length > 0) {
              this.selectedMeeting = this.meetings[0];
            }
          });

          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar actas', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  selectMeeting(meeting: Meeting) {
    this.selectedMeeting = meeting;
  }
}
