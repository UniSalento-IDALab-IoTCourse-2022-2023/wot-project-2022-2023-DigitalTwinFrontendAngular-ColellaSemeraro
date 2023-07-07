import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneprofilocoachComponent } from './gestioneprofilocoach.component';

describe('GestioneprofilocoachComponent', () => {
  let component: GestioneprofilocoachComponent;
  let fixture: ComponentFixture<GestioneprofilocoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneprofilocoachComponent]
    });
    fixture = TestBed.createComponent(GestioneprofilocoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
