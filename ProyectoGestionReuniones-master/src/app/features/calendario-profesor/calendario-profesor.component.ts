import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../shared/services/modal.service';
import { DisponibilidadService } from '../calendario/views/services/disponibilidad.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-calendario-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario-profesor.component.html',
  styleUrls: ['./calendario-profesor.component.scss']
})
export class CalendarioProfesorComponent implements OnInit {

  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  dniProfesor: string = '';

  // Lista de horas seleccionadas para el día actual
  selectedHours: string[] = [];

  // Mapa de fecha -> Array de horas ya publicadas
  publishedAvailability: Map<string, string[]> = new Map();

  monthNames: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  calendarDays: { day: number, disabled: boolean, empty: boolean, hasSlots: boolean }[] = [];

  hours: string[] = [
    '08:30 - 09:25',
    '09:30 - 10:25',
    '11:00 - 11:55',
    '12:00 - 12:55',
    '13:00 - 13:55',
    '14:00 - 14:55'
  ];

  constructor(
    private modalService: ModalService,
    private disponibilidadService: DisponibilidadService
  ) { }

  ngOnInit(): void {
    this.dniProfesor = localStorage.getItem('dni') || '';
    if (this.dniProfesor) {
      this.loadProfessorAvailability();
    } else {
      this.modalService.alert('Error', 'No se encontró el DNI del profesor. Por favor, inicie sesión.');
    }
  }

  loadProfessorAvailability() {
    this.disponibilidadService.getPorProfesor(this.dniProfesor).subscribe({
      next: (slots) => {
        this.publishedAvailability.clear();
        slots.forEach(slot => {
          const dateObj = new Date(slot.fecha);
          const dateKey = this.formatDateKey(dateObj);
          if (!this.publishedAvailability.has(dateKey)) {
            this.publishedAvailability.set(dateKey, []);
          }
          this.publishedAvailability.get(dateKey)?.push(slot.hora);
        });
        this.renderCalendar();
      },
      error: (err) => console.error('Error cargando disponibilidad del profesor', err)
    });
  }

  formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  renderCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.calendarDays = [];

    for (let i = 0; i < startDay; i++) {
      this.calendarDays.push({ day: 0, disabled: false, empty: true, hasSlots: false });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDayDate = new Date(year, month, day);
      const dateKey = this.formatDateKey(currentDayDate);
      const hasSlots = this.publishedAvailability.has(dateKey);
      const disabled = currentDayDate < today && !this.isSameDay(currentDayDate, today);

      this.calendarDays.push({ day, disabled, empty: false, hasSlots });
    }
  }

  isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  selectDay(day: { day: number, disabled: boolean, empty: boolean }): void {
    if (day.disabled || day.empty) return;
    this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day.day);

    const dateKey = this.formatDateKey(this.selectedDate);
    this.selectedHours = [...(this.publishedAvailability.get(dateKey) || [])];
  }

  toggleHour(hour: string): void {
    const index = this.selectedHours.indexOf(hour);
    if (index > -1) {
      this.selectedHours.splice(index, 1);
    } else {
      this.selectedHours.push(hour);
    }
  }

  saveAvailability(): void {
    if (!this.selectedDate || this.selectedHours.length === 0) {
      this.modalService.alert('Atención', 'Por favor, selecciona una fecha y al menos una hora.');
      return;
    }

    const fechaStr = this.formatDateKey(this.selectedDate);
    const dateKey = this.formatDateKey(this.selectedDate);
    const existingHours = this.publishedAvailability.get(dateKey) || [];

    // Ver cuáles son nuevas (están en selectedHours pero no en existingHours)
    const newHours = this.selectedHours.filter(h => !existingHours.includes(h));

    if (newHours.length === 0) {
      this.modalService.alert('Información', 'No has añadido horas nuevas para esta fecha.');
      return;
    }

    this.modalService.confirm(
      'Publicar disponibilidad',
      `¿Deseas publicar ${newHours.length} nuevo(s) hueco(s) para el ${fechaStr}?`,
      'Publicar'
    ).then(confirmed => {
      if (confirmed) {
        const requests = newHours.map(hora =>
          this.disponibilidadService.crearDisponibilidad({
            fecha: fechaStr,
            hora: hora,
            id_profesor: this.dniProfesor
          })
        );

        forkJoin(requests).subscribe({
          next: () => {
            this.modalService.alert('Éxito', 'Disponibilidad publicada correctamente.');
            this.loadProfessorAvailability();
          },
          error: (err) => {
            console.error('Error al publicar disponibilidad', err);
            this.modalService.alert('Error', 'Hubo un error al guardar la disponibilidad.');
          }
        });
      }
    });
  }

  getMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }
}