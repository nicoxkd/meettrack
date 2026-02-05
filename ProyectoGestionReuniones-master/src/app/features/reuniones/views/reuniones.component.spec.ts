import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionesComponent } from './reuniones.component';

describe('ReunionesComponent', () => {
  let component: ReunionesComponent;
  let fixture: ComponentFixture<ReunionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReunionesComponent]
    });
    fixture = TestBed.createComponent(ReunionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
