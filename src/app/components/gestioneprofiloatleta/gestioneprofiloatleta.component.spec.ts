import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneprofiloatletaComponent } from './gestioneprofiloatleta.component';

describe('GestioneprofiloatletaComponent', () => {
  let component: GestioneprofiloatletaComponent;
  let fixture: ComponentFixture<GestioneprofiloatletaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneprofiloatletaComponent]
    });
    fixture = TestBed.createComponent(GestioneprofiloatletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
