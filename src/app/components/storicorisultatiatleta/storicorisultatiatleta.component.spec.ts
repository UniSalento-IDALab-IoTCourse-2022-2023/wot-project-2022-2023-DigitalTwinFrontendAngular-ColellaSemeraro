import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricorisultatiatletaComponent } from './storicorisultatiatleta.component';

describe('StoricorisultatiatletaComponent', () => {
  let component: StoricorisultatiatletaComponent;
  let fixture: ComponentFixture<StoricorisultatiatletaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoricorisultatiatletaComponent]
    });
    fixture = TestBed.createComponent(StoricorisultatiatletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
