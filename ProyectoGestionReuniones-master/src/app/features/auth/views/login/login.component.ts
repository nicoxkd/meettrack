import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  dni: string = '';
  password: string = '';
  mensajeError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    this.mensajeError = '';
    console.log(' Intentando iniciar sesión con DNI:', this.dni);

    this.authService.login(this.dni, this.password).subscribe({
      next: (response) => {
        console.log(' Respuesta del servidor:', response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          if (response.nombre) {
            localStorage.setItem('nombre', response.nombre);
          }
          if (response.dni) {
            localStorage.setItem('dni', response.dni);
          }
          if (response.role) {
            localStorage.setItem('role', response.role);
          }

          console.log(' Login exitoso. Redirigiendo según rol:', response.role);
          const targetRoute = response.role === 'profesor' ? '/dashboardprofesor' : '/dashboard';

          this.router.navigate([targetRoute]).then(success => {
            if (success) {
              console.log(' Navegación exitosa!');
            } else {
              console.error(' La navegación falló.');
            }
          });
        } else {
          console.error(' El servidor no devolvió un token.');
          this.mensajeError = 'Error de conexión: No se recibió el token.';
        }
      },
      error: (error) => {
        console.error(' Error en la petición de login:', error);
        this.mensajeError = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
