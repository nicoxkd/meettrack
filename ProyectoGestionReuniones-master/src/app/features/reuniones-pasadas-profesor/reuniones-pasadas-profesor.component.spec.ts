import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionesPasadasProfesorComponent } from './reuniones-pasadas-profesor.component';

describe('ReunionesPasadasProfesorComponent', () => {
  let component: ReunionesPasadasProfesorComponent;
  let fixture: ComponentFixture<ReunionesPasadasProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReunionesPasadasProfesorComponent]
    });
    fixture = TestBed.createComponent(ReunionesPasadasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
