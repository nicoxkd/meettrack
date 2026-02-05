import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActasComponent } from './actas-pasadas.component';

describe('ActasPasadasComponent', () => {
  let component: ActasComponent;
  let fixture: ComponentFixture<ActasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActasComponent]
    });
    fixture = TestBed.createComponent(ActasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
