import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentasForm } from './rentas-form';

describe('RentasForm', () => {
  let component: RentasForm;
  let fixture: ComponentFixture<RentasForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentasForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentasForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
