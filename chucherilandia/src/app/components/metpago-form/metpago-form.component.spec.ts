import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetpagoFormComponent } from './metpago-form.component';

describe('MetpagoFormComponent', () => {
  let component: MetpagoFormComponent;
  let fixture: ComponentFixture<MetpagoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetpagoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetpagoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
