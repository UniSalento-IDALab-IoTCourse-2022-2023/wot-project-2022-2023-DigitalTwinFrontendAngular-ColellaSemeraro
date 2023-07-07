import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAmministratoreComponent } from './home-amministratore.component';

describe('HomeAmministratoreComponent', () => {
  let component: HomeAmministratoreComponent;
  let fixture: ComponentFixture<HomeAmministratoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAmministratoreComponent]
    });
    fixture = TestBed.createComponent(HomeAmministratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
