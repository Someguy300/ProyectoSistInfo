import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfectoComponent } from './efecto.component';

describe('EfectoComponent', () => {
  let component: EfectoComponent;
  let fixture: ComponentFixture<EfectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EfectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
