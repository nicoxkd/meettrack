import { Component } from '@angular/core';
import { ReunionesService } from 'src/app/features/reuniones/views/services/reuniones.service';

@Component({
  selector: 'app-dashboard-alumno',
  templateUrl: './dashboard-alumno.component.html',
  styleUrls: []
})
export class DashboardAlumnoComponent {
  reuniones: any[] = [];
  loading = true;

  constructor(private reunionesService: ReunionesService) { }

  ngOnInit() {
    const dni = localStorage.getItem('dni');
    if (dni) {
      this.reunionesService.getReunionesAlumno(dni).subscribe({
        next: (data: any[]) => {
          const now = new Date();

          this.reuniones = data
            .map(r => {
              const horaInicio = r.hora.split(' - ')[0];
              const [horas, minutos] = horaInicio.split(':');
              const fechaReunion = new Date(r.fecha);
              if (horas && minutos) {
                fechaReunion.setHours(parseInt(horas), parseInt(minutos), 0);
              }
              return { ...r, fullDate: fechaReunion };
            })
            .filter(reunion => {
              // Solo mostrar si es futura (o ahora) Y no está finalizada
              const esFutura = reunion.fullDate >= now;
              const noFinalizada = reunion.estado !== 'finalizada';
              return esFutura && noFinalizada;
            })
            .sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());

          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar reuniones', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}
