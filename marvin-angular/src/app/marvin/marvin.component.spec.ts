import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarvinComponent } from './marvin.component';

describe('MarvinComponent', () => {
  let component: MarvinComponent;
  let fixture: ComponentFixture<MarvinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarvinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarvinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
