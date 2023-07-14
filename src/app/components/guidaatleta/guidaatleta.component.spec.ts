import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidaatletaComponent } from './guidaatleta.component';

describe('GuidaatletaComponent', () => {
  let component: GuidaatletaComponent;
  let fixture: ComponentFixture<GuidaatletaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuidaatletaComponent]
    });
    fixture = TestBed.createComponent(GuidaatletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
