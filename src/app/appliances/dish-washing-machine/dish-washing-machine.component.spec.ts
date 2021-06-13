import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishWashingMachineComponent } from './dish-washing-machine.component';

describe('DishWashingMachineComponent', () => {
  let component: DishWashingMachineComponent;
  let fixture: ComponentFixture<DishWashingMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishWashingMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishWashingMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
