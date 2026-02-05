import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/views/login/login.component';
import { ListadoComponent } from './features/reuniones/views/listado/listado.component';
import { DetalleComponent } from './features/reuniones/views/detalle/detalle.component';
import { DesplegableComponent } from './shared/components/layout/desplegable/desplegable.component';
import { DashboardAlumnoComponent } from './features/dashboard/views/dashboard-alumno/dashboard-alumno.component';
import { AsignaturasComponent } from './features/selectorAsignatura/views/asignaturas/asignaturas.component';
import { CalendarioComponent } from './features/calendario/views/calendario/calendario.component';
import { ReunionesComponent } from './features/reuniones/views/reuniones.component';
import { ActasComponent } from './features/actasPasadas/actas-pasadas.component';
import { DashboardProfesorComponent } from './features/dashboard-profesor/dashboard-profesor.component';
import { ProximasReunionesProfesorComponent } from './features/proximas-reuniones-profesor/proximas-reuniones-profesor.component';
import { NotificacionesProfesorComponent } from './features/notificaciones-profesor/notificaciones-profesor.component';
import { ReunionesPasadasProfesorComponent } from './features/reuniones-pasadas-profesor/reuniones-pasadas-profesor.component';

import { CalendarioProfesorComponent } from './features/calendario-profesor/calendario-profesor.component';
import { ActaPasadaProfesorComponent } from './features/acta-pasada-profesor/acta-pasada-profesor.component';
import { FaqComponent } from './features/faq/faq.component';
import { ModalComponent } from './shared/components/ui/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { ReunionesService } from './features/reuniones/views/services/reuniones.service';
import { ActasService } from './features/actasPasadas/services/actas.service';
import { AuthService } from './features/auth/services/auth.service';
import { DisponibilidadService } from './features/calendario/views/services/disponibilidad.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListadoComponent,
    DetalleComponent,
    DesplegableComponent,
    DashboardAlumnoComponent,
    AsignaturasComponent,
    CalendarioComponent,
    ReunionesComponent,
    ActasComponent,
    DashboardProfesorComponent,
    FaqComponent,
    ModalComponent


    // CalendarioProfesorComponent <-- ELIMINADO DE AQUÍ
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CalendarioProfesorComponent,
    NotificacionesProfesorComponent,
    ProximasReunionesProfesorComponent,
    ActaPasadaProfesorComponent,
    ReunionesPasadasProfesorComponent
  ],
  providers: [ReunionesService, ActasService, AuthService, DisponibilidadService],
  bootstrap: [AppComponent]
})
export class AppModule { }