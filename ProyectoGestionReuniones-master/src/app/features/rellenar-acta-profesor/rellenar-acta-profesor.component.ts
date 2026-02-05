import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActasService } from '../actasPasadas/services/actas.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
    selector: 'app-rellenar-acta-profesor',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './rellenar-acta-profesor.component.html',
    styleUrls: ['./rellenar-acta-profesor.component.scss']
})
export class RellenarActaComponent implements OnInit {

    dniAlumno: string = '';
    dniProfesor: string = '';
    idReunion: string = '';
    nombreAlumno: string = '';
    reunionInfo: string = '';
    contenido: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private actasService: ActasService,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        this.dniProfesor = localStorage.getItem('dni') || '';

        // Capturamos parámetros de la URL
        this.route.queryParams.subscribe(params => {
            this.dniAlumno = params['dniAlumno'] || '';
            this.idReunion = params['idReunion'] || '';
            this.nombreAlumno = params['nombreAlumno'] || 'el alumno';
            this.reunionInfo = `${params['fecha']} a las ${params['hora']}`;
        });

        if (!this.dniProfesor) {
            this.modalService.alert('Error', 'No se pudo identificar al profesor. Por favor reingrese.');
            this.router.navigate(['/login']);
        }
    }

    guardarActa() {
        if (!this.contenido.trim()) {
            this.modalService.alert('Atención', 'El contenido del acta no puede estar vacío.');
            return;
        }

        const datos = {
            contenido: this.contenido,
            id_alumno: this.dniAlumno,
            id_profesor: this.dniProfesor,
            id_reunion: this.idReunion
        };

        this.modalService.confirm(
            'Enviar Acta',
            `¿Deseas enviar el acta de la reunión con ${this.nombreAlumno}? Una vez enviada, no podrá ser modificada.`,
            'Enviar'
        ).then(confirmed => {
            if (confirmed) {
                this.actasService.crearActa(datos).subscribe({
                    next: () => {
                        this.modalService.alert('Éxito', 'Acta enviada correctamente.');
                        this.router.navigate(['/reunionespasadasprofesor']);
                    },
                    error: (err) => {
                        console.error('Error al enviar acta', err);
                        this.modalService.alert('Error', 'Hubo un error al enviar el acta.');
                    }
                });
            }
        });
    }

    goBack() {
        this.router.navigate(['/reunionespasadasprofesor']);
    }
}
