import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OctadsComponent } from './octads.component';

describe('OctadsComponent', () => {
  let component: OctadsComponent;
  let fixture: ComponentFixture<OctadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OctadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OctadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
