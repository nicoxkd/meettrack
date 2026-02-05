import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaPasadaProfesorComponent } from './acta-pasada-profesor.component';

describe('ActaPasadaProfesorComponent', () => {
  let component: ActaPasadaProfesorComponent;
  let fixture: ComponentFixture<ActaPasadaProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActaPasadaProfesorComponent]
    });
    fixture = TestBed.createComponent(ActaPasadaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
