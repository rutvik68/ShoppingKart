import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustmberComponent } from './coustmber.component';

describe('CoustmberComponent', () => {
  let component: CoustmberComponent;
  let fixture: ComponentFixture<CoustmberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoustmberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoustmberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
