import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneallenamentiComponent } from './gestioneallenamenti.component';

describe('GestioneallenamentiComponent', () => {
  let component: GestioneallenamentiComponent;
  let fixture: ComponentFixture<GestioneallenamentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneallenamentiComponent]
    });
    fixture = TestBed.createComponent(GestioneallenamentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
