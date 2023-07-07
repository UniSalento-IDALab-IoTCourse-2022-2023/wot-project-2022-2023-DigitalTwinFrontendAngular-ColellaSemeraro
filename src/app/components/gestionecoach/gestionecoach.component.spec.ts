import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionecoachComponent } from './gestionecoach.component';

describe('GestionecoachComponent', () => {
  let component: GestionecoachComponent;
  let fixture: ComponentFixture<GestionecoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionecoachComponent]
    });
    fixture = TestBed.createComponent(GestionecoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
