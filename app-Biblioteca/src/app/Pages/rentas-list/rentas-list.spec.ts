import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentasList } from './rentas-list';

describe('RentasList', () => {
  let component: RentasList;
  let fixture: ComponentFixture<RentasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentasList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentasList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
