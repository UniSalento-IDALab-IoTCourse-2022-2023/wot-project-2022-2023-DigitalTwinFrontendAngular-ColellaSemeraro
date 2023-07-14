import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficorisultaticoachComponent } from './graficorisultaticoach.component';

describe('GraficorisultaticoachComponent', () => {
  let component: GraficorisultaticoachComponent;
  let fixture: ComponentFixture<GraficorisultaticoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficorisultaticoachComponent]
    });
    fixture = TestBed.createComponent(GraficorisultaticoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
