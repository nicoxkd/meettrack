import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableComponent } from './desplegable.component';

describe('DesplegableComponent', () => {
  let component: DesplegableComponent;
  let fixture: ComponentFixture<DesplegableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableComponent]
    });
    fixture = TestBed.createComponent(DesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
