import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAtletaComponent } from './home-atleta.component';

describe('HomeAtletaComponent', () => {
  let component: HomeAtletaComponent;
  let fixture: ComponentFixture<HomeAtletaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAtletaComponent]
    });
    fixture = TestBed.createComponent(HomeAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
