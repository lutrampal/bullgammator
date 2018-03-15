import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbComponent } from './mb.component';

describe('MbComponent', () => {
  let component: MbComponent;
  let fixture: ComponentFixture<MbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
