import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../shared/services/modal.service';
import { NotificacionesService } from './services/notificaciones.service';

interface Notification {
  id: number;
  tipo: 'accepted' | 'cancelled';
  mensaje: string;
  fecha: Date;
}

@Component({
  selector: 'app-notificaciones-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones-profesor.component.html',
  styleUrls: ['./notificaciones-profesor.component.scss']
})
export class NotificacionesProfesorComponent implements OnInit {
  notifications: Notification[] = [];
  loading: boolean = true;
  dniProfesor: string = '';

  constructor(
    private modalService: ModalService,
    private notificacionesService: NotificacionesService
  ) { }

  ngOnInit(): void {
    this.dniProfesor = localStorage.getItem('dni') || '';
    if (this.dniProfesor) {
      this.loadNotifications();
    }
  }

  loadNotifications(): void {
    this.loading = true;
    this.notificacionesService.getNotificaciones(this.dniProfesor).subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar notificaciones', err);
        this.loading = false;
      }
    });
  }

  deleteNotification(notificationId: number): void {
    this.notificacionesService.eliminarNotificacion(notificationId).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
      },
      error: (err) => {
        console.error('Error al eliminar notificación', err);
        this.modalService.alert('Error', 'No se pudo eliminar la notificación.');
      }
    });
  }

  clearAllNotifications(): void {
    if (this.notifications.length === 0) return;

    this.modalService.confirm(
      'Eliminar Notificaciones',
      '¿Estás seguro de que quieres eliminar todas las notificaciones?',
      'Eliminar Todas'
    ).then(confirmed => {
      if (confirmed) {
        this.notificacionesService.limpiarNotificaciones(this.dniProfesor).subscribe({
          next: () => {
            this.notifications = [];
          },
          error: (err) => {
            console.error('Error al limpiar notificaciones', err);
            this.modalService.alert('Error', 'No se pudieron eliminar las notificaciones.');
          }
        });
      }
    });
  }
}