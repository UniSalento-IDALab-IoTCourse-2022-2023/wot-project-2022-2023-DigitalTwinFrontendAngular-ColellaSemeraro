import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficorisultatiatletaComponent } from './graficorisultatiatleta.component';

describe('GraficorisultatiatletaComponent', () => {
  let component: GraficorisultatiatletaComponent;
  let fixture: ComponentFixture<GraficorisultatiatletaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficorisultatiatletaComponent]
    });
    fixture = TestBed.createComponent(GraficorisultatiatletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
