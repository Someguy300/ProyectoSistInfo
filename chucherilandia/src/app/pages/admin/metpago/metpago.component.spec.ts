import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetpagoComponent } from './metpago.component';

describe('MetpagoComponent', () => {
  let component: MetpagoComponent;
  let fixture: ComponentFixture<MetpagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetpagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
