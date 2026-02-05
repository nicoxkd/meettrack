import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para standalone
import { ActivatedRoute, RouterModule } from '@angular/router'; // Para capturar el ID y navegar

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
    console.log('Descargando acta:', this.acta.id);
  }

  printActa(): void {
    window.print();
  }

  goBack(): void {
    window.history.back();
  }
}