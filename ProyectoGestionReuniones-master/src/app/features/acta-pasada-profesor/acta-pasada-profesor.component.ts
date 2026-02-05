import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para standalone
import { ActivatedRoute, RouterModule } from '@angular/router'; // Para capturar el ID y navegar
import jsPDF from 'jspdf';

interface Acta {
  id: number;
  studentName: string;
  subject: string;
  date: string;
  content: string;
}

@Component({
  selector: 'app-acta-pasada-profesor',
  standalone: true, // Lo hacemos standalone
  imports: [CommonModule, RouterModule], // Importamos módulos básicos
  templateUrl: './acta-pasada-profesor.component.html',
  styleUrls: ['./acta-pasada-profesor.component.scss']
})
export class ActaPasadaProfesorComponent implements OnInit {
  acta: Acta = {
    id: 0,
    studentName: '',
    subject: '',
    date: '',
    content: ''
  };

  private actasData: Acta[] = [
    {
      id: 1,
      studentName: 'Alejandro Pérez Ferri',
      subject: 'IPE',
      date: '03/12/2025',
      content: 'Se discutieron los aspectos del diseño y la resolución de problemas relacionados con el proyecto. El alumno mostró avances significativos en la comprensión de los conceptos clave.'
    },
    {
      id: 2,
      studentName: 'Jaime Martín García',
      subject: 'Proyecto de DAW',
      date: '08/12/2025',
      content: 'Se realizó una evaluación exhaustiva del proyecto y se identificaron los principales fallos que requieren corrección antes de la siguiente entrega.'
    },
    {
      id: 3,
      studentName: 'Nicolás Cabello Rodríguez',
      subject: 'Inglés profesional',
      date: '13/12/2025',
      content: 'En esta reunión se llega a un acuerdo con el alumno, la tarea enviada para el día 5 de noviembre será aplazada solamente para el alumno Nicolás Cabello Rodríguez debido a su ausencia por un tema familiar importante.'
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Capturamos el parámetro 'id' de la URL definida en el routing
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadActa(+id);
      } else {
        // Por defecto si no hay ID en la URL
        this.acta = this.actasData[0];
      }
    });
  }

  loadActa(id: number): void {
    const foundActa = this.actasData.find(a => a.id === id);
    if (foundActa) {
      this.acta = foundActa;
    } else {
      console.error(`Acta con ID ${id} no encontrada`);
      this.acta = this.actasData[0];
    }
  }

  downloadActa(): void {
    if (!this.acta) return;

    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();

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
    doc.text(`Alumno: ${this.acta.studentName}`, margin, 50);
    doc.text(`Asunto: ${this.acta.subject}`, margin, 60);
    doc.text(`Fecha: ${this.acta.date}`, margin, 70);

    // Contenido del acta
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Detalles del acta:', margin, 90);

    doc.setFontSize(11);
    const splitText = doc.splitTextToSize(this.acta.content, pageWidth - (margin * 2));
    doc.text(splitText, margin, 100);

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Generado por MeetTrack', pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });

    doc.save(`Acta_${this.acta.studentName.replace(/ /g, '_')}_${this.acta.date.replace(/\//g, '-')}.pdf`);
  }

  printActa(): void {
    window.print();
  }

  goBack(): void {
    window.history.back();
  }
}