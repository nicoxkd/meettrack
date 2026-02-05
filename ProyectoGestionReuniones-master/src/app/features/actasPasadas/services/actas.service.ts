import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActasService {
    private actasUrl = 'http://localhost:3000/api/actas';

    constructor(private http: HttpClient) { }

    private getHeaders() {
        const token = localStorage.getItem('token');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getActasAlumno(dni: string): Observable<any> {
        return this.http.get(`${this.actasUrl}/alumno/${dni}`, { headers: this.getHeaders() });
    }

    getActasProfesor(dni: string): Observable<any> {
        return this.http.get(`${this.actasUrl}/profesor/${dni}`, { headers: this.getHeaders() });
    }

    crearActa(datos: { contenido: string, id_alumno: string, id_profesor: string, id_reunion: string }): Observable<any> {
        return this.http.post(this.actasUrl, datos, { headers: this.getHeaders() });
    }
}
