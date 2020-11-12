import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetenvioCreateComponent } from './metenvio-create.component';

describe('MetenvioCreateComponent', () => {
  let component: MetenvioCreateComponent;
  let fixture: ComponentFixture<MetenvioCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetenvioCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetenvioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
