import { Component } from '@angular/core';

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  activeIndex: number | null = null;

  faqs: FAQ[] = [
    {
      question: '¿Qué es MeetTrack?',
      answer: 'MeetTrack es una aplicación diseñada para ayudarte a organizar y gestionar tus reuniones de manera eficiente. Con MeetTrack puedes programar reuniones, realizar seguimiento de actas, asignar tareas y mantener todo organizado en un solo lugar.'
    },
    {
      question: '¿Cómo me ayuda la app a organizar mis reuniones?',
      answer: 'La app te permite crear agendas, establecer objetivos claros, asignar responsables, tomar notas durante las reuniones y hacer seguimiento de los acuerdos alcanzados. Todo esto de forma centralizada y accesible desde cualquier dispositivo.'
    },
    {
      question: '¿Qué ventajas tengo al usar la app frente a actas manuales?',
      answer: 'Las principales ventajas incluyen: ahorro de tiempo al automatizar procesos, mejor organización y búsqueda de información, acceso desde cualquier lugar, posibilidad de compartir actas instantáneamente, y seguimiento automático de tareas y compromisos pendientes.'
    },
    {
      question: '¿Quién puede utilizar la aplicación?',
      answer: 'MeetTrack puede ser utilizada por cualquier profesional o equipo que necesite organizar reuniones: empresas, equipos de proyecto, organizaciones sin fines de lucro, grupos de estudio, o cualquier persona que desee mejorar la productividad de sus reuniones.'
    },
    {
      question: '¿Es segura la información que guardo en la app?',
      answer: 'Sí, toda la información se almacena de forma segura con encriptación de datos. Implementamos las mejores prácticas de seguridad para proteger tu información y la de tu equipo. Además, cumplimos con todas las normativas de protección de datos vigentes.'
    },
    {
      question: '¿La app permite editar y gestionar mis actas?',
      answer: 'Absolutamente. Puedes crear, editar, eliminar y compartir actas en cualquier momento. También puedes agregar participantes, anexar documentos, modificar fechas y actualizar el estado de las tareas asociadas a cada reunión.'
    }
  ];

  toggleFAQ(index: number): void {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }
}
