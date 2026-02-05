import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActasService } from './services/actas.service';
import jsPDF from 'jspdf';

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

  downloadPDF() {
    if (!this.selectedMeeting) return;

    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = this.selectedMeeting.subject;
    const date = new Date(this.selectedMeeting.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    // Título
    doc.setFontSize(22);
    doc.setTextColor(40, 44, 52);
    doc.text('Acta de Reunión', pageWidth / 2, 30, { align: 'center' });

    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.line(margin, 35, pageWidth - margin, 35);

    // Información general
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Asunto: ${title}`, margin, 50);
    doc.text(`Fecha: ${date}`, margin, 60);

    // Contenido del acta
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Detalles del acta:', margin, 80);

    doc.setFontSize(11);
    const splitText = doc.splitTextToSize(this.selectedMeeting.detail, pageWidth - (margin * 2));
    doc.text(splitText, margin, 90);

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Generado por MeetTrack', pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });

    doc.save(`Acta_${this.selectedMeeting.date}.pdf`);
  }
}
