import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidaamministratoreComponent } from './guidaamministratore.component';

describe('GuidaamministratoreComponent', () => {
  let component: GuidaamministratoreComponent;
  let fixture: ComponentFixture<GuidaamministratoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuidaamministratoreComponent]
    });
    fixture = TestBed.createComponent(GuidaamministratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
