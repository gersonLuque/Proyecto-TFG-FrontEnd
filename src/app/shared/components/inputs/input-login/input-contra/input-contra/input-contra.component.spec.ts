import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContraComponent } from './input-contra.component';

describe('InputContraComponent', () => {
  let component: InputContraComponent;
  let fixture: ComponentFixture<InputContraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputContraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
