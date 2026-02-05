import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {

    private apiUrl = 'http://localhost:3000/api/notificaciones';

    constructor(private http: HttpClient) { }

    private getHeaders() {
        const token = localStorage.getItem('token');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getNotificaciones(dni: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${dni}`, { headers: this.getHeaders() });
    }

    eliminarNotificacion(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    limpiarNotificaciones(dni: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/limpiar/${dni}`, { headers: this.getHeaders() });
    }
}
