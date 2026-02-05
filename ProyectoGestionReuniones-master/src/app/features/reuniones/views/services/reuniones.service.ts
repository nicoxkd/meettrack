import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReunionesService {

  // AQUÍ ESTÁ LA CLAVE: Esto apunta a tu servidor Node
  private apiUrl = 'http://localhost:3000/api/reuniones';

  constructor(private http: HttpClient) { }

  // Función auxiliar para coger el Token del navegador
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 1. Pedir mis reuniones al servidor
  getMisReuniones(): Observable<any> {
    // Hace un GET a http://localhost:3000/api/reuniones/mis-reuniones
    return this.http.get(`${this.apiUrl}/mis-reuniones`, { headers: this.getHeaders() });
  }

  getReunionesAlumno(dni: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/alumno/${dni}`, { headers: this.getHeaders() });
  }

  // 2. Cancelar una reunión (Borrar)
  cancelarReunion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Listar reuniones de un profesor
  getReunionesProfesor(dni: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profesor/${dni}`, { headers: this.getHeaders() });
  }

  // 3. Crear una nueva reunión
  crearReunion(datos: { dni_alumno: string, id_disponibilidad: string }): Observable<any> {
    // POST http://localhost:3000/api/reuniones
    return this.http.post(this.apiUrl, datos, { headers: this.getHeaders() });
  }
}
