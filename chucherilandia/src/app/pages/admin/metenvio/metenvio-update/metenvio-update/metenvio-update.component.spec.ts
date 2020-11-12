import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetenvioUpdateComponent } from './metenvio-update.component';

describe('MetenvioUpdateComponent', () => {
  let component: MetenvioUpdateComponent;
  let fixture: ComponentFixture<MetenvioUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetenvioUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetenvioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
