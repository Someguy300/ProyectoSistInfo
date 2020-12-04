import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBagComponent } from './create-bag.component';

describe('CreateBagComponent', () => {
  let component: CreateBagComponent;
  let fixture: ComponentFixture<CreateBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
