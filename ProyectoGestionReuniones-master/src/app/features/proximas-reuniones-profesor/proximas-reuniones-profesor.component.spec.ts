import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximasReunionesProfesorComponent } from './proximas-reuniones-profesor.component';

describe('ProximasReunionesProfesorComponent', () => {
  let component: ProximasReunionesProfesorComponent;
  let fixture: ComponentFixture<ProximasReunionesProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProximasReunionesProfesorComponent]
    });
    fixture = TestBed.createComponent(ProximasReunionesProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
