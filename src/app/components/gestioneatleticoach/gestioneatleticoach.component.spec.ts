import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneatleticoachComponent } from './gestioneatleticoach.component';

describe('GestioneatleticoachComponent', () => {
  let component: GestioneatleticoachComponent;
  let fixture: ComponentFixture<GestioneatleticoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneatleticoachComponent]
    });
    fixture = TestBed.createComponent(GestioneatleticoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
