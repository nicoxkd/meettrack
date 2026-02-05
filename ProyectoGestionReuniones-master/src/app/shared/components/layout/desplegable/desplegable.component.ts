import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: []
})
export class DesplegableComponent implements OnInit {
  sidebarActive = false;
  nombreUsuario: string = '';
  rolUsuario: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombre') || 'Usuario';
    this.rolUsuario = localStorage.getItem('role') || 'alumno';
  }

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
