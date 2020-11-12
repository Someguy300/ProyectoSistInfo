import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetpagoCreateComponent } from './metpago-create.component';

describe('MetpagoCreateComponent', () => {
  let component: MetpagoCreateComponent;
  let fixture: ComponentFixture<MetpagoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetpagoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetpagoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
