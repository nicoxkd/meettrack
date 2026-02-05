import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesProfesorComponent } from './notificaciones-profesor.component';

describe('NotificacionesProfesorComponent', () => {
  let component: NotificacionesProfesorComponent;
  let fixture: ComponentFixture<NotificacionesProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacionesProfesorComponent]
    });
    fixture = TestBed.createComponent(NotificacionesProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
