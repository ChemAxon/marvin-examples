import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarvinproComponent } from './marvinpro.component';

describe('MarvinproComponent', () => {
  let component: MarvinproComponent;
  let fixture: ComponentFixture<MarvinproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarvinproComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarvinproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
