import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../shared/services/modal.service';
import { DisponibilidadService } from '../services/disponibilidad.service';
import { ReunionesService } from '../../../reuniones/views/services/reuniones.service';

interface Slot {
  id_disponibilidad: string;
  fecha: string;
  hora: string;
  nombre: string;
  apellidos: string;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  selectedSlot: Slot | null = null;

  // Mapa de fecha (YYYY-MM-DD) -> Array de Slots
  availabilityMap: Map<string, Slot[]> = new Map();
  availableSlotsForDay: Slot[] = [];

  monthNames: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  weekdays: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  calendarDays: { day: number, disabled: boolean, empty: boolean, hasSlots: boolean }[] = [];

  constructor(
    private modalService: ModalService,
    private disponibilidadService: DisponibilidadService,
    private reunionesService: ReunionesService
  ) { }

  ngOnInit(): void {
    this.loadAvailability();
  }

  loadAvailability() {
    this.disponibilidadService.getTodasLibres().subscribe({
      next: (slots) => {
        this.availabilityMap.clear();
        slots.forEach(slot => {
          const dateObj = new Date(slot.fecha);
          const dateKey = this.formatDateKey(dateObj);

          if (!this.availabilityMap.has(dateKey)) {
            this.availabilityMap.set(dateKey, []);
          }
          this.availabilityMap.get(dateKey)?.push(slot);
        });
        this.renderCalendar();
      },
      error: (err) => console.error('Error cargando disponibilidad', err)
    });
  }

  formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
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
      const hasSlots = this.availabilityMap.has(dateKey);
      const disabled = currentDayDate < today && !this.isSameDay(currentDayDate, today);

      this.calendarDays.push({ day, disabled, empty: false, hasSlots });
    }
  }

  isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  selectDay(day: { day: number, disabled: boolean, empty: boolean, hasSlots: boolean }): void {
    if (day.empty || day.disabled) return;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    this.selectedDate = new Date(year, month, day.day);

    const dateKey = this.formatDateKey(this.selectedDate);
    this.availableSlotsForDay = this.availabilityMap.get(dateKey) || [];
    this.selectedSlot = null;
  }

  selectSlot(slot: Slot): void {
    this.selectedSlot = slot;
  }

  confirmMeeting(): void {
    if (!this.selectedSlot) {
      this.modalService.alert('Atención', 'Por favor, selecciona una hora para la reunión');
      return;
    }

    const dniAlumno = localStorage.getItem('dni');
    if (!dniAlumno) {
      this.modalService.alert('Error', 'No estás identificado. Por favor, vuelve a iniciar sesión.');
      return;
    }

    const datos = {
      dni_alumno: dniAlumno,
      id_disponibilidad: this.selectedSlot.id_disponibilidad
    };

    this.modalService.confirm(
      'Confirmar reunión',
      `¿Confirmar reunión con ${this.selectedSlot.nombre} ${this.selectedSlot.apellidos} a las ${this.selectedSlot.hora.slice(0, 5)}?`,
      'Confirmar'
    ).then(confirmed => {
      if (confirmed) {
        this.reunionesService.crearReunion(datos).subscribe({
          next: () => {
            this.modalService.alert('Éxito', 'Reunión reservada con éxito');
            this.loadAvailability();
            this.selectedSlot = null;
            this.availableSlotsForDay = [];
          },
          error: (err) => {
            console.error(err);
            this.modalService.alert('Error', 'Hubo un error al reservar la reunión.');
          }
        });
      }
    });
  }

  getMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

}
