import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllenamentiamministratoreComponent } from './allenamentiamministratore.component';

describe('AllenamentiamministratoreComponent', () => {
  let component: AllenamentiamministratoreComponent;
  let fixture: ComponentFixture<AllenamentiamministratoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllenamentiamministratoreComponent]
    });
    fixture = TestBed.createComponent(AllenamentiamministratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
