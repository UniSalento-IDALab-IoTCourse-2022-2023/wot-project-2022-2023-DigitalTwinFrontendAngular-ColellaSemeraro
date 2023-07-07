import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneatletiComponent } from './gestioneatleti.component';

describe('GestioneatletiComponent', () => {
  let component: GestioneatletiComponent;
  let fixture: ComponentFixture<GestioneatletiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneatletiComponent]
    });
    fixture = TestBed.createComponent(GestioneatletiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
