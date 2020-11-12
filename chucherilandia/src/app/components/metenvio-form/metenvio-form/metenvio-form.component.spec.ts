import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetenvioFormComponent } from './metenvio-form.component';

describe('MetenvioFormComponent', () => {
  let component: MetenvioFormComponent;
  let fixture: ComponentFixture<MetenvioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetenvioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetenvioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
