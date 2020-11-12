import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetpagoUpdateComponent } from './metpago-update.component';

describe('MetpagoUpdateComponent', () => {
  let component: MetpagoUpdateComponent;
  let fixture: ComponentFixture<MetpagoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetpagoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetpagoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
