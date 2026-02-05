import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DisponibilidadService {

    private apiUrl = 'http://localhost:3000/api/disponibilidad';

    constructor(private http: HttpClient) { }

    private getHeaders() {
        const token = localStorage.getItem('token');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    // Obtener todos los huecos libres (de cualquier profesor)
    getTodasLibres(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    // Obtener disponibilidad de un profesor concreto (si lo usáramos)
    getPorProfesor(idProfesor: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/profesor/${idProfesor}`, { headers: this.getHeaders() });
    }

    // Crear una nueva disponibilidad
    crearDisponibilidad(datos: { fecha: string, hora: string, id_profesor: string }): Observable<any> {
        return this.http.post(this.apiUrl, datos, { headers: this.getHeaders() });
    }
}
