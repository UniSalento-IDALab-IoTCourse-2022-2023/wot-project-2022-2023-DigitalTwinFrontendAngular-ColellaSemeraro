import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidacoachComponent } from './guidacoach.component';

describe('GuidacoachComponent', () => {
  let component: GuidacoachComponent;
  let fixture: ComponentFixture<GuidacoachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuidacoachComponent]
    });
    fixture = TestBed.createComponent(GuidacoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
