import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesplegableComponent } from './shared/components/layout/desplegable/desplegable.component';
import { DashboardAlumnoComponent } from './features/dashboard/views/dashboard-alumno/dashboard-alumno.component';
import { AsignaturasComponent } from './features/selectorAsignatura/views/asignaturas/asignaturas.component';
import { CalendarioComponent } from './features/calendario/views/calendario/calendario.component';
import { ReunionesComponent } from './features/reuniones/views/reuniones.component';
import { ActasComponent } from './features/actasPasadas/actas-pasadas.component';
import { DashboardProfesorComponent } from './features/dashboard-profesor/dashboard-profesor.component';
import { CalendarioProfesorComponent } from './features/calendario-profesor/calendario-profesor.component';
import { ProximasReunionesProfesorComponent } from './features/proximas-reuniones-profesor/proximas-reuniones-profesor.component';
import { NotificacionesProfesorComponent } from './features/notificaciones-profesor/notificaciones-profesor.component';
import { ReunionesPasadasProfesorComponent } from './features/reuniones-pasadas-profesor/reuniones-pasadas-profesor.component';
import { ActaPasadaProfesorComponent } from './features/acta-pasada-profesor/acta-pasada-profesor.component';
import { FaqComponent } from './features/faq/faq.component';
import { LoginComponent } from './features/auth/views/login/login.component';
import { RellenarActaComponent } from './features/rellenar-acta-profesor/rellenar-acta-profesor.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DesplegableComponent,
    children: [
      { path: 'dashboard', component: DashboardAlumnoComponent },
      { path: 'asignaturas', component: AsignaturasComponent },
      { path: 'calendario', component: CalendarioComponent },
      { path: 'reuniones', component: ReunionesComponent },
      { path: 'actas', component: ActasComponent },
      { path: 'dashboardprofesor', component: DashboardProfesorComponent },
      { path: 'calendarioprofesor', component: CalendarioProfesorComponent },
      { path: 'reunionesprofesor', component: ProximasReunionesProfesorComponent },
      { path: 'notificacionesprofesor', component: NotificacionesProfesorComponent },
      { path: 'reunionespasadasprofesor', component: ReunionesPasadasProfesorComponent },
      { path: 'actapasadaprofesor', component: ActaPasadaProfesorComponent },
      { path: 'rellenar-acta', component: RellenarActaComponent },
      { path: 'faq', component: FaqComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
