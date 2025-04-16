import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcodeComponent } from './bcode.component';

describe('BcodeComponent', () => {
  let component: BcodeComponent;
  let fixture: ComponentFixture<BcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
