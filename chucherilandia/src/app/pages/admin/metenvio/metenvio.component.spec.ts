import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetenvioComponent } from './metenvio.component';

describe('MetenvioComponent', () => {
  let component: MetenvioComponent;
  let fixture: ComponentFixture<MetenvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetenvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetenvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
