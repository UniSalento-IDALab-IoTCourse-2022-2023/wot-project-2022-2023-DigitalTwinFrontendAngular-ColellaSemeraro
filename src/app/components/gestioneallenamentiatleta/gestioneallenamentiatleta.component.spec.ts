import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneallenamentiatletaComponent } from './gestioneallenamentiatleta.component';

describe('GestioneallenamentiatletaComponent', () => {
  let component: GestioneallenamentiatletaComponent;
  let fixture: ComponentFixture<GestioneallenamentiatletaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneallenamentiatletaComponent]
    });
    fixture = TestBed.createComponent(GestioneallenamentiatletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
