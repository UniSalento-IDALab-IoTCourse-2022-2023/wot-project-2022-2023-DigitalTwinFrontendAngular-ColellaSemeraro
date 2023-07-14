import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoallenamentiComponent } from './storicoallenamenti.component';

describe('StoricoallenamentiComponent', () => {
  let component: StoricoallenamentiComponent;
  let fixture: ComponentFixture<StoricoallenamentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoricoallenamentiComponent]
    });
    fixture = TestBed.createComponent(StoricoallenamentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
